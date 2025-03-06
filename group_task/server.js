const express = require("express");
const { connectToDatabase } = require("./db");
const { getAllMovies, importMovies } = require("./db/movies");

const app = express();

// Get all movies from the database
app.get("/api/movies/", async (req, res) => {
    const { director } = req.query  
    let filter = {}
    if(director) {
        filter = { director }
    }
  try {
    const movies = await getAllMovies(filter);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await connectToDatabase();
  console.log("Connected to database");
  const movies = await getAllMovies();
  if (movies.length === 0) {
    console.log("No movies found");
    await importMovies();
    console.log("Movies imported successfully");
  }
});
