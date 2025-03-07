const { db } = require(".");

const usersCollection = db.collection("users");

async function getAllUsers() {
  const users = await usersCollection.find({}).toArray();
  return users;
}

async function getUserById(id) {
  const user = await usersCollection.findOne({ _id: id });
  return user;
}

async function createUser(user) {
  const result = await usersCollection.insertOne(user);
  const newUser = await getUserById(result.insertedId);
  return newUser;
}

async function updateUser(id, user) {
  const result = await usersCollection.findOneAndUpdate(
    { _id: id },
    { $set: user },
    { returnDocument: "after" }
  );
  return result;
}

async function deleteUser(id) {
  return await usersCollection.findOneAndDelete({ _id: id });
}

async function deleteAllUsers() {
  return await usersCollection.deleteMany({});
}

async function importUsers() {
  const path = require("path");
  const fs = require("fs");
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf8")
  );
  await usersCollection.insertMany(users);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  importUsers,
  deleteAllUsers,
};
