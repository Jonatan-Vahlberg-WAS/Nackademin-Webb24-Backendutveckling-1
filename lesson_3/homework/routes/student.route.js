const { Router } = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../db/students");

const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
  let filter = {};
  try {
    const students = await getAllStudents(filter);
    res.json(students);
  } catch (error) {
    console.warn("Failed to fetch students");
    res.json([]);
  }
});

studentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const student = await getStudentById(id);
    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }
    res.json(student);
  } catch (error) {
    console.warn("Failed to fetch student", error);
    res.status(404).json({
      error: "Student not found",
    });
  }
});

studentRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.age || !body.program) {
    return res.status(400).json({
      error: "name, age and program is required",
    });
  }
  try {
    const student = await createStudent({
      name: body.name,
      age: body.age,
      program: body.program,
      yearGraduated: body.yearGraduated,
    });
    return res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      error: "Unable to create user",
      message: error.message,
    });
  }
});

studentRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!body.name || !body.age || !body.program) {
    return res.status(400).json({
      error: "name, age and program is required",
    });
  }
  try {
    const student = await updateStudent(id, {
      name: body.name,
      age: body.age,
      program: body.program,
      yearGraduated: body.yearGraduated,
    });
    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }
    res.json(student);
  } catch (error) {
    console.warn("Failed to fetch student", error);
    res.status(404).json({
      error: "Student not found",
    });
  }
});

studentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await deleteStudent(id);
    if (!deletedStudent) {
      throw new Error("No student found");
    }
    res.status(204).json();
  } catch (error) {
    console.warn("Failed to delete student", error);
    res.status(404).json({
      error: "Student not found",
    });
  }
});

module.exports = studentRouter;
