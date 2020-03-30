const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  deletePost,
  editPost,
  postById,
  addComment,
  deleteComment,
  addLike,
  removeLike
} = require("../controllers/post");
const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

router.post("/create", auth, createPost);
router.get("/posts", getPosts);
router.delete("/:postId", auth, isOwner, deletePost);
router.put("/:postId", auth, isOwner, editPost);
router.put("/addComment/:postId", auth, addComment);
router.delete("/deleteComment/:postId/:commentId", auth, deleteComment);
router.put("/addLike/:postId", auth, addLike);
router.put("/removeLike/:postId", auth, removeLike);

// any route containing :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;
