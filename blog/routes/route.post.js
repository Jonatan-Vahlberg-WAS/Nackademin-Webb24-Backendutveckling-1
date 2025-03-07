const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.warn("Error fetching posts", error);
        res.json([])
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error("Post not found");
        }
        res.status(200).json(post);
    } catch (error) {
        console.warn("Error fetching post", error);
        res.status(404).json({ message: "Post not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.warn("Error creating post", error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            throw new Error("Post not found");
        }
        res.status(200).json(post);
    } catch (error) {
        console.warn("Error updating post", error);
        res.status(404).json({ message: "Post not found" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            throw new Error("Post not found");
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.warn("Error deleting post", error);
        res.status(404).json({ message: "Post not found" });
    }
});

module.exports = router;