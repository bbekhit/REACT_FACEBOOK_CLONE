const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProfileSchema = mongoose.Schema({
  user: {
    _id: {
      type: ObjectId,
      ref: "User"
    },
    name: {
      type: String
    },
    email: {
      type: String
    }
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  following: [{ type: ObjectId, ref: "User" }],
  follower: [{ type: ObjectId, ref: "User" }]
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
