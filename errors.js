// 1-in server.js we implemented express middleware with 4 parameters and put it in a separate File(errorController)

// 2-we implemented error creator class(AppError) to get the message and attach to it status and statusCode

// 3-we use this in server.js to create an error and be catched in the middleware we created in step#1
app.all("*", (req, res, next) => {
  // res.status(404).json({ error: `Can't find ${req.originalUrl}` });
  // const err = new Error(`Can't find ${req.originalUrl}`);
  // err.statusCode = 404;
  // err.status = "fail";
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
// Express error handler middleware
app.use(globalErrorHandler); // from (errorController)
// here we catch any error that passed from all routes

// 4-create the catchAsync wrapper and wrap all controllers and get rid of all trycatch blocks
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // try {
  let user = await User.findOne({ email });
  if (!user) {
    // // return res.status(422).json({ error: "Invalid credentials" });
    // return res.status(400).json({
    //   status: "fail",
    //   error: "Invalid credentials"
    // });
    next(new AppError(`Invalid credentials`, 422));
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

5-
