require('dotenv').config();

const { MongoClient } = require("mongodb")

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test"

const client = new MongoClient(MONGO_URI)

async function connectToDB() {
    try {
        await client.connect()
        console.log("Connected to: ", MONGO_URI)
           } catch(error) {
        console.warn("Error in connecting to DB: ", MONGO_URI)
        console.warn(error)
    }
}

module.exports = {
    client,
    connectToDB
}