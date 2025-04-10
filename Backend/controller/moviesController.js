import { getAllMovies, deleteSingleMovie, addMovie, updateMovie, fetchMovieById
} from '../model/moviesModal.js';
// Get all movies
export const getMovies = async (req, res) => {
  try {
    // Fetching all movies from the database
    const movies = await getAllMovies();
    res.status(200).json(movies);  // Return the movies as a JSON response
  } catch (error) {
    // Logging and returning a 500 status for internal server error
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get a single movie by movie_id
export const getMovieById = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const movie = await fetchMovieById(movie_id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Delete a single movie by movie_id
export const deleteMovie = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const result = await deleteSingleMovie(movie_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Add a new movie
export const postMovies = async (req, res) => {
  try {
    const movieData = req.body;
    const result = await addMovie(movieData);
    res.status(201).json({ message: 'Movie added successfully', movie_id: result.insertId });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Update an existing movie by movie_id
export const patchMovie = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const updateData = req.body;
    const result = await updateMovie(movie_id, updateData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found or no changes made' });
    }
    res.status(200).json({ message: 'Movie updated successfully' });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};