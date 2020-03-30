const Profile = require("../models/Profile");

exports.profileById = (req, res, next, id) => {
  Profile.findById(id)
    // .populate("user", "_id name role")
    .exec((err, profile) => {
      if (err || !profile) {
        return res.status(400).json({
          error: "No profile found"
        });
      }
      req.profile = profile;
      next();
    });
};

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ "user._id": req.user._id });

    if (!profile) {
      return res
        .status(400)
        .json({ error: "There is no profile for this user" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res
      .status(422)
      .json({ error: "Somethig went wrong with creating a profile" });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const newProfile = new Profile({
      ...req.body,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
    await newProfile.save();
    res.status(200).json(newProfile);
  } catch (error) {
    res
      .status(422)
      .json({ error: "Somethig went wrong with creating a profile" });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(422).json({ error: "Can't fetch profiless, try again later" });
  }
};

exports.addFollowing = async (req, res, next) => {
  try {
    let profile = await Profile.findByIdAndUpdate(
      req.body.userProfileId,
      {
        $push: { following: req.body.targetUserId }
      },
      { new: true }
    );
    next();
  } catch (err) {
    res.status(422).json({ error: "Please try again later" });
  }
};

exports.addFollower = async (req, res) => {
  try {
    let targetedProfile = await Profile.findByIdAndUpdate(
      req.body.targetProfileId,
      { $push: { follower: req.body.userId } },
      { new: true }
    );
    res.status(200).json(targetedProfile);
  } catch (err) {
    res.status(422).json({ error: "Please try again later" });
  }
};

exports.removeFollowing = async (req, res, next) => {
  try {
    let profile = await Profile.findByIdAndUpdate(
      req.body.userProfileId,
      {
        $pull: { following: req.body.targetUserId }
      },
      { new: true }
    );
    next();
  } catch (err) {
    res.status(422).json({ error: "Please try again later" });
  }
};

exports.removeFollower = async (req, res) => {
  try {
    let targetedProfile = await Profile.findByIdAndUpdate(
      req.body.targetProfileId,
      { $pull: { follower: req.body.userId } },
      { new: true }
    );
    res.status(200).json(targetedProfile);
  } catch (err) {
    res.status(422).json({ error: "Please try again later" });
  }
};

exports.getFollowing = async (req, res) => {
  let following = req.profile.following;
  following.push(req.profile.user._id);
  try {
    const toFollow = await Profile.find({ "user._id": { $nin: following } });

    res.status(200).json(toFollow);
  } catch (error) {
    res.status(422).json({ error: "Can't fetch profiless, try again later" });
  }
};
