const express = require("express");
const { connectToDatabase } = require("./db");
const { getAllStudents, importStudents } = require("./db/students");
const studentRouter = require("./routes/student.route")

const app = express();

app.use(express.json())

// Uses the router for all student commuincations
app.use("/api/students", studentRouter)

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
