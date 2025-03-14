const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");

// Get all comments for a specific post
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new comment
router.post("/posts/:postId/comments", async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      post: req.params.postId,
      user: req.body.user,
    });
    const newComment = await comment.save();
    await newComment.populate("user", "name email");
    res.status(201).json(newComment);
  } catch (error) {
    console.warn(error);
    res.status(400).json({ message: error.message });
  }
});

// Update a comment
router.put("/comments/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this comment" });
    }

    comment.content = req.body.content;
    const updatedComment = await comment.save();
    await updatedComment.populate("user", "name email");
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete("/comments/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
