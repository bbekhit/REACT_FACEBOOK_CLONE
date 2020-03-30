const express = require("express");
const router = express.Router();
const {
  profileById,
  getCurrentProfile,
  createProfile,
  getProfiles,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  getFollowing
} = require("../controllers/profile");
const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

router.get("/me", auth, getCurrentProfile);
router.post("/create", auth, createProfile);
router.get("/profiles", getProfiles);
router.put("/addFollowing", auth, addFollowing, addFollower);
router.put("/removeFollowing", auth, removeFollowing, removeFollower);
router.get("/following/:profileId", auth, getFollowing);

// any route containing :profileId, our app will first execute profileById()
router.param("profileId", profileById);

module.exports = router;
