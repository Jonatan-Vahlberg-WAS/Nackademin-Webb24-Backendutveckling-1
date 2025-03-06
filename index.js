require('dotenv').config();

const { MongoClient } = require("mongodb")

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test"

const client = new MongoClient(MONGO_URI)
const database = client.db('test')
const userCollection = database.collection("users")

async function getUsers() {
    return await userCollection.find().toArray()
}

async function getUser(_id) {
    return await userCollection.findOne({
        _id: _id
    })
}

async function addUser(data) {
    const result = await userCollection.insertOne(data)
    const user = await getUser(result.insertedId)
    return user
}

async function updateUser(_id, updatedData) {
    const user = await userCollection.findOneAndUpdate({ _id }, {
        "$set": updatedData
    }, {
        returnDocument: "after"
    })
    return user
}

async function deleteUsers() {
    return await userCollection.deleteMany()
}

async function deleteUser(_id) {
    return await userCollection.deleteOne({ _id })
}


async function connectToDB() {
    try {
        await client.connect()
        await userCollection.createIndex({firstName: 'text'})
        console.log("Connected to: ", MONGO_URI)
        const userData = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com"
        }

        // Create new user in db
        const user = await addUser(userData)
        console.log("New user", user)

        // Gets all users
        let users = await getUsers(database)
        console.log("Users", users)

        if(user) {
            const updatedUser = await updateUser(user._id, {
                firstName: "Jane",
                email: "jane.doe@example.com"
            })
            console.log("Updated user", updatedUser)
            // await deleteUser(updatedUser._id)
            console.log("User deleted")
        }

        
        users = await getUsers()
        console.log("Users:", users)
        // await deleteUsers()
    } catch(error) {
        console.warn("Error in connecting to DB: ", MONGO_URI)
        console.warn(error)
    }
    await client.close()
    console.log("Disconnected from: ", MONGO_URI)
}

connectToDB()