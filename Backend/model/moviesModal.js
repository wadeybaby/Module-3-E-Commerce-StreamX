import { pool } from '../config/config.js'; // Ensure this is your MySQL connection pool
// Fetching all movies from the database
export const getAllMovies = async () => {
  try {
    // Query the database to get all movies
    const [rows] = await pool.query('SELECT * FROM movies'); // Assuming your table is 'movies'
    return rows;
  } catch (error) {
    throw error;
  }
};
// Get a single movie by movie_id
export const fetchMovieById = async (movie_id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movies WHERE movie_id = ?', [movie_id]);
    return rows.length > 0 ? rows[0] : null; // Return the first movie object or null
  } catch (error) {
    throw error;
  }
};
// Delete a single movie by movie_id
export const deleteSingleMovie = async (movie_id) => {
  try {
    const [result] = await pool.query('DELETE FROM movies WHERE movie_id = ?', [movie_id]);
    return result;
  } catch (error) {
    throw error;
  }
};
// Add a new movie
export const addMovie = async (movieData) => {
  try {
    const { title, description, year_released, duration, rental_price, trailer_url, img_link } = movieData;
    const [result] = await pool.query(
      'INSERT INTO movies (title, description, year_released, duration, rental_price, trailer_url, img_link) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, year_released, duration, rental_price, trailer_url, img_link]
    );
    return result;
  } catch (error) {
    throw error;
  }
};
// Update an existing movie by movie_id
export const updateMovie = async (movie_id, updateData) => {
  try {
    if (Object.keys(updateData).length === 0) {
      throw new Error('No update fields provided');
    }
    const updateFields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(updateData);
    values.push(movie_id); // Push movie_id at the end for WHERE condition
    const [result] = await pool.query(
      `UPDATE movies SET ${updateFields} WHERE movie_id = ?`,
      values
    );
    return result;
  } catch (error) {
    throw error;
  }
};