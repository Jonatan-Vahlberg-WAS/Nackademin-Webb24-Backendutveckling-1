const { db } = require(".");

const studentsCollection = db.collection("students");

async function getAllStudents() {
  const students = await studentsCollection.find({}).toArray();
  return students;
}

async function getStudentById(id) {
  const student = await studentsCollection.findOne({ _id: id });
  return student;
}

async function createStudent(student) {
  const result = await studentsCollection.insertOne(student);
  const newStudent = await getStudentById(result.insertedId);
  return newStudent;
}

async function updateStudent(id, student) {
  const result = await studentsCollection.findOneAndUpdate(
    { _id: id },
    { $set: student },
    { returnDocument: "after" }
  );
  return result;
}

async function deleteStudent(id) {
  return await studentsCollection.findOneAndDelete({ _id: id });
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
