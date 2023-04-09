const express = require("express");
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/postController");
const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id");
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", likePost);
router.post("/:id/unlike", unlikePost);

module.exports = router;
