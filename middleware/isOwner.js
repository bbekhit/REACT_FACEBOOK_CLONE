module.exports = (req, res, next) => {
  let sameUser =
    req.post &&
    req.user &&
    req.post.user._id.toString() === req.user._id.toString();
  let adminUser = req.post && req.user && req.user.role === "admin";

  // console.log("req.post ", req.post, " req.user ", req.user);
  // console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

  let isPoster = sameUser || adminUser;

  if (!isPoster) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};
