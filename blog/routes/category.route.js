const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.warn("Error fetching categories", error);
        res.json([])
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new Error("Category not found");
        }
        res.status(200).json(category);
    } catch (error) {
        console.warn("Error fetching category", error);
        res.status(404).json({ message: "Category not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        console.warn("Error creating category", error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            throw new Error("Category not found");
        }
        res.status(200).json(category);
    } catch (error) {
        console.warn("Error updating category", error);
        res.status(404).json({ message: "Category not found" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            throw new Error("Category not found");
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.warn("Error deleting category", error);
        res.status(404).json({ message: "Category not found" });
    }
});

module.exports = router;