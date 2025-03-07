const express = require("express");
const { connectToDatabase } = require("./db");
const { getAllStudents, importStudents } = require("./db/students");

const app = express();

// Get all students from the database
app.get("/api/students/", async (req, res) => {
    const { director } = req.query  
    let filter = {}
    if(director) {
        filter = { director }
    }
  try {
    const students = await getAllStudents(filter);
    res.json(students);
  } catch (error) {
    console.warn("Failed to fetch students")
    res.json([])
  }
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await connectToDatabase();
  console.log("Connected to database");
  const students = await getAllStudents();
  if (students.length === 0) {
    console.log("No students found");
    await importStudents();
    console.log("Students imported successfully");
  }
});
