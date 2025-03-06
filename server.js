const express = require("express")

const {
    client,
    connectToDB
} = require("./db")

const app = express();

app.get("/", async (req,res) => {
    const users = await client.db("test").collection("users").find().toArray()
    return res.json(users)
})

app.listen(3000, async () => {
    console.log("App listening on 3000")
    await connectToDB()
})