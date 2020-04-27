const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization) {
  //   return res.status(401).json({ error: "NOT AUTHORIZED" });
  // }
  // const token = authorization.replace("Bearer ", "");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = authorization.replace("Bearer ", "");
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "NOT AUTHORIZED" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
