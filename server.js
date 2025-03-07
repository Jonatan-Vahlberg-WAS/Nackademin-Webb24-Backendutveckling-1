const express = require("express");

const mongoose = require("mongoose");

const Student = require("./models/student.model");

const app = express();

app.use(express.json());

app.get("/api/students", async (req, res) => {
  const { q, program } = req.query;
  try {
    let students = [];
    let filter = {}
    if (q) {
        filter.name = { $regex: q, $options: "i" }
    }
    if(program) {
        filter.program = program
    }
    students = await Student.find(filter)
    return res.json(students);
  } catch (error) {
    console.warn("Error in getting students", error);
    res.json([]);
  }
});

app.get("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error("No student found");
    }
    return res.json(student);
  } catch (error) {
    console.warn("Error in getting student", error);
    res.status(404).json({
      error: "Student not found",
    });
  }
});

app.post("/api/students", async (req, res) => {
  const body = req.body;
  try {
    const student = await Student.create(body);
    res.status(201).json(student);
  } catch (error) {
    console.warn("Error in creating student", error);
    res.status(500).json({
      error: "Error in creating student",
    });
  }
});

app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const studentData = {
    ...body,
  };
  delete studentData._id;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      {
        $set: studentData,
      },
      {
        new: true,
      }
    );
    if (!student) {
      throw new Error("Student not found");
    }
    res.json(student);
  } catch (error) {
    console.warn("Error in getting student", error);
    res.status(404).json({
      error: "Student not found",
    });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return res.status(204).json();
  } catch (error) {
    console.warn("Error in getting student", error);
    res.status(404).json({
      error: "Student not found",
    });
  }
});

app.listen(3000, async () => {
  console.log("App listening on 3000");
  await mongoose
    .connect("mongodb://localhost:27017/mongoose")
    .then(() => {
      console.log("Mongoose connected sucessfully");
    })
    .catch((error) => {
      console.warn("Error connecting to database", error);
    });
});
