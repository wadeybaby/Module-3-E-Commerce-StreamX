import express from 'express';

import { rentMovie } from '../controller/rentalsController.js'; // FIXED: Import correct function

const router = express.Router();

// router.post('/', mockAuth, rentM ovie);// FIXED: Correct function name

export default router;
