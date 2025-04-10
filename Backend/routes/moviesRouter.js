import express from 'express';
import { getMovies, deleteMovie, postMovies, patchMovie, getMovieById } from '../controller/moviesController.js';
const router = express.Router();
// Movies Routes
router.get('/', getMovies); // Get all movies
router.get('/:movie_id', getMovieById); // Get movie by movie_id
router.delete('/:movie_id', deleteMovie); // Corrected: Delete movie by movie_id
router.post('/', postMovies); // Post new movie
router.patch('/:movie_id', patchMovie); // Update movie by movie_id

export default router;