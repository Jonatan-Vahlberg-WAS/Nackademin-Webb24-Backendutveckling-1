const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data.json");

// Helper function to read data from file
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // If file doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

// Helper function to write data to file
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET /items - Get all items or filter by category
router.get("/", async (req, res) => {
  try {
    const items = await readData();
    const { category } = req.query;

    // If category is provided, filter items
    if (category) {
      const filteredItems = items.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filteredItems);
    }

    res.json(items);
  } catch (error) {
    console.error("Error reading items:", error);
    res.status(500).json({ error: "Failed to read items" });
  }
});

// GET /items/:id - Get a specific item by ID
router.get("/:id", async (req, res) => {
  try {
    const items = await readData();
    const item = items.find((item) => item.id === parseInt(req.params.id));

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error reading item:", error);
    res.status(500).json({ error: "Failed to read item" });
  }
});

// POST /items - Add a new item
router.post("/", async (req, res) => {
  try {
    const items = await readData();
    const newItem = req.body;

    // Validate required fields
    if (!newItem.name || !newItem.category) {
      return res.status(400).json({
        error: "Name and category are required",
      });
    }

    // Generate new ID (max existing id + 1)
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    newItem.id = newId;

    // Add new item to array
    items.push(newItem);

    // Write updated data back to file
    await writeData(items);

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// PUT /items/:id - Update an existing item
router.put("/:id", async (req, res) => {
  try {
    const items = await readData();
    const id = parseInt(req.params.id);
    const updatedItem = req.body;

    // Find the index of the item to update
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Validate required fields
    if (!updatedItem.name || !updatedItem.category) {
      return res.status(400).json({
        error: "Name and category are required",
      });
    }

    // Update the item while preserving the ID
    items[index] = { ...items[index], ...updatedItem, id };

    // Write updated data back to file
    await writeData(items);

    res.json(items[index]);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE /items/:id - Delete an item
router.delete("/:id", async (req, res) => {
  try {
    const items = await readData();
    const id = parseInt(req.params.id);

    // Find the index of the item to delete
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Remove the item from the array
    items.splice(index, 1);

    // Write updated data back to file
    await writeData(items);

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
