const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");


const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

const postRoutes = require("./routes/route.post");
app.use("/api/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose.connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.warn("Error connecting to MongoDB", err);
  });
});
