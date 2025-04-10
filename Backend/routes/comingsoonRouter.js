import express from 'express';
import { getComingsoon } from '../controller/comingsoonController.js';

const router = express.Router();

router.get('/', getComingsoon);

export default router;
