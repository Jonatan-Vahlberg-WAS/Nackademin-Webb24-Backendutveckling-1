const { db } = require(".");

const moviesCollection = db.collection("movies");

async function getAllMovies(filter) {
  const movies = await moviesCollection.find(filter).toArray();
  return movies;
}

async function getMovieById(id) {
  const movie = await moviesCollection.findOne({ _id: id });
  return movie;
}

async function createMovie(movie) {
  const result = await moviesCollection.insertOne(movie);
  const newMovie = await getMovieById(result.insertedId);
  return newMovie;
}

async function updateMovie(id, movie) {
  const result = await moviesCollection.findOneAndUpdate(
    { _id: id },
    { $set: movie },
    { returnDocument: "after" }
  );
  return result;
}

async function deleteMovie(id) {
  return await moviesCollection.findOneAndDelete({ _id: id });
}

async function deleteAllMovies() {
  return await moviesCollection.deleteMany({});
}

async function importMovies() {
  const path = require("path");
  const fs = require("fs");
  const movies = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/movies.json"), "utf8")
  );
  await moviesCollection.insertMany(movies);
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  importMovies,
  deleteAllMovies,
};
