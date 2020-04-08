const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Must provide name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Must provide email"],
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  role: {
    type: String,
    default: "user"
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordLink: {
    type: String,
    default: ""
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.hasSamePassword = function(providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password);
};

// userSchema.methods.comparePassword = function(candidatePassword) {
//   const user = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }
//       if (!isMatch) {
//         return reject(false);
//       }
//       resolve(true);
//     });
//   });
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
