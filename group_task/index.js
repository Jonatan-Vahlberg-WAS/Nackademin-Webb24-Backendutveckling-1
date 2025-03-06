const { connectToDatabase } = require("./db");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  importMovies,
  deleteAllMovies,
} = require("./db/movies");

connectToDatabase();

async function main() {
  console.log("Importing movies...");
  await importMovies();
  console.log("Movies imported successfully");
  let movies = await getAllMovies();
  console.log("All movies:", movies, "\n");

  const newMovie = await createMovie({
    title: "The Wizard of Oz",
    director: "Victor Fleming",
    year: 1939,
  });
  console.log("New movie:", newMovie, "\n");

  const updatedMovie = await updateMovie(newMovie._id, {
    title: "The Wizard of Oz",
  });
  console.log("Updated movie:", updatedMovie, "\n");

  const deletedMovie = await deleteMovie(newMovie._id);
  console.log("Deleted movie:", deletedMovie, "\n");

  const movieById = await getMovieById(newMovie._id);
  console.log("Movie by ID:", movieById, "\n");

  movies = await getAllMovies();
  console.log("All movies:", movies, "\n");

  await deleteAllMovies();
  console.log("All movies deleted");
}

main();
