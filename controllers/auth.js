const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.preSignup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (user) {
      // return res.status(400).json({
      //   error: "Email is taken"
      // });
      return next(new AppError(`Email already Taken`, 422));
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `MYFACEAPP activation link`,
      html: `
          <p>Please use the following link to activate your acccount:</p>
					<p>${
            process.env.NODE_ENV === "production"
              ? process.env.CLIENT_URL
              : "http://localhost:3000"
          }/auth/account/activate/${token}</p>
					<hr />
					<p>This email may contain sensetive information</p>
					<p>https://MYFACEAPP.com</p>
			`
    };
    sgMail.send(emailData).then(sent => {
      return res.json({
        message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
      });
    });
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // return res.status(422).json({
    //   status: "fail",
    //   error: "Email already Taken"
    // });
    return next(new AppError("Email already Taken", 404));
  }
  user = new User(req.body);
  await user.save();
  res.status(200).json({ message: "You Successfuly signed up, please login" });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // try {
  let user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Invalid credentials!!!!", 404));
  }
  await user.comparePassword(password);

  // generate a token and send to client
  const token = jwt.sign(
    { userId: user._id },
    // { userId: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600
    }
  );
  res.cookie("token", token, { expiresIn: 3600 });
  user.password = undefined;
  return res.json({
    token
  });
  // } catch (error) {
  //   return res.status(422).json({ error: "Somethig went wrong with signin" });
  // }
});

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success"
  });
};

exports.getCurrentUser = async (req, res) => {
  let user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return next(new AppError(`No user found`, 422));
  }
  return res.status(200).json({
    status: "success",
    user
  });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
  const idToken = req.body.tokenId;
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then(response => {
      // console.log("back", response);
      const { email_verified, email, jti, name } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            // console.log(user);
            const token = jwt.sign(
              { userId: user._id },
              // { userId: user._id, name, email, role: user.role },
              process.env.JWT_SECRET,
              {
                expiresIn: 3600
                // expiresIn: "1d"
              }
            );
            // console.log(profileObj);
            res.cookie("token", token, { expiresIn: "1d" });
            return res.json({
              token
            });
          } else {
            let password = jti + process.env.JWT_SECRET;
            user = new User({ name, email, password });

            user.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: "Can't save user"
                });
              }
              const token = jwt.sign(
                { userId: data._id, name: "Test", email: "Test" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              res.cookie("token", token, { expiresIn: "1d" });
              return res.json({
                token
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again."
        });
      }
    });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(`No user found`, 422));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_PASSWORD, {
    expiresIn: "10m"
  });

  // email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Password reset link`,
    html: `
					<p>Please use the following link to reset your password:</p>
					<p>${
            process.env.NODE_ENV === "production"
              ? process.env.CLIENT_URL
              : "http://localhost:3000"
          }/auth/password/reset/${token}</p>
					<hr />
					<p>This email may contain sensetive information</p>
					<p>https://MYFACEAPP.com</p>
			`
  };
  // populating the db > user > resetPasswordLink
  return user.updateOne({ resetPasswordLink: token }, (err, success) => {
    if (err) {
      return res.json({ error: "Something went wrong" });
    } else {
      sgMail.send(emailData).then(sent => {
        return res.json({
          message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
        });
      });
    }
  });
});

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({
          error: "Expired link. Try again"
        });
      }
      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(401).json({
            error: "Something went wrong. Try later"
          });
        }
        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ""
        };

        user = Object.assign(user, updatedFields);
        // console.log(user);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong"
            });
          }
          res.json({
            message: `Great! Now you can login with your new password`
          });
        });
      });
    });
  }
};
