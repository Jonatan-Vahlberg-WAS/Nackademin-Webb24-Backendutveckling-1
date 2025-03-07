const { ObjectId } = require("mongodb");
const { db } = require(".");

const studentsCollection = db.collection("students");

async function getAllStudents() {
  const students = await studentsCollection.find({}).toArray();
  return students;
}

async function getStudentById(id) {
  const _id = new ObjectId(id)
  console.log("Get student", _id)
  const student = await studentsCollection.findOne({ _id: _id });
  console.log("Student", student)
  return student;
}

async function createStudent(student) {
  const result = await studentsCollection.insertOne(student);
  const newStudent = await getStudentById(result.insertedId);
  return newStudent;
}

async function updateStudent(id, studentData) {
  const _id = new ObjectId(id)
  const student = await studentsCollection.findOneAndUpdate(
    { _id: _id },
    { $set: studentData },
    { returnDocument: "after" }
  );
  return student;
}

async function deleteStudent(id) {
  const _id = new ObjectId(id)
  return await studentsCollection.findOneAndDelete({ _id: _id });
}

async function deleteAllStudents() {
  return await studentsCollection.deleteMany({});
}

async function importStudents() {
  const path = require("path");
  const fs = require("fs");
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/students.json"), "utf8")
  );
  await studentsCollection.insertMany(students);
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  importStudents,
  deleteAllStudents,
};
