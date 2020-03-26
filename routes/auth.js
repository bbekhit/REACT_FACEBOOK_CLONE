const express = require("express");
const router = express.Router();
const {
  preSignup,
  signup,
  signin,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  googleLogin
} = require("../controllers/auth");
const auth = require("../middleware/auth");

router.post("/pre-signup", preSignup);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", auth, getCurrentUser);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.post("/google-login", googleLogin);

module.exports = router;
