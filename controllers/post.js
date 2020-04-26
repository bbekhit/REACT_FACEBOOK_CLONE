const Post = require("../models/Post");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("user", "_id name role")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err,
        });
      }
      req.post = post;
      next();
    });
};

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      user: req.user._id,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(422).json({ error: "Somethig went wrong with creating a post" });
  }
};

exports.getPosts = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  try {
    const posts = await Post.find().limit(limit).skip(skip);
    res.status(200).json({ posts, size: posts.length });
  } catch (error) {
    res.status(422).json({ error: "Can't fetch posts, try again later" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    let post = req.post;
    await post.remove();
    res.status(200).json({ message: "Post removed successfuly" });
  } catch (err) {
    res.status(500).json({ error: "Somethig went wrong" });
  }
};

exports.editPost = async (req, res) => {
  try {
    let post = req.post;
    post = Object.assign(post, req.body);
    await post.save();
    res.status(200).json({ message: "Post edited successfuly" });
  } catch (err) {
    res.status(500).json({ error: "Somethig went wrong" });
  }
};

exports.addComment = async (req, res) => {
  const comment = {
    body: req.body.comment,
    user: req.user._id,
  };
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { comments: comment } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res
      .status(422)
      .json({ error: "Somethig went wrong with creating a comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res
      .status(422)
      .json({ error: "Somethig went wrong with creating a comment" });
  }
};

exports.addLike = async (req, res) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { likes: req.user._id } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(422).json({ error: "Somethig went wrong with adding like" });
  }
};

exports.removeLike = async (req, res) => {
  try {
    let post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(422).json({ error: "Somethig went wrong with removing like" });
  }
};
