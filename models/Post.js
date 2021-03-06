const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer,
    contenType: String
  },
  postedBy: {
    type: String
  },
  user: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  likes: [],
  comments: [
    // {
    //   // text: { type: String },
    //   created: { type: Date, default: Date.now }
    //   // postedBy: { type: ObjectId, ref: "User" }
    // }
    {
      user: {
        type: ObjectId,
        ref: "User"
      },
      body: {
        type: String
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
