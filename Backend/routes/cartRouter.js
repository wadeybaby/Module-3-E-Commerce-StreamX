// routes/cart.js
import express from 'express';
import { postCartController, getCartController,deleteCartItemController } from '../controller/cartController.js';
import { cartMiddleware } from '../middleware/cartMiddleware.js'; // Import the combined middleware

const router = express.Router();

router.post('/', cartMiddleware, postCartController);
router.get('/', cartMiddleware, getCartController);
router.delete('/:movieId', cartMiddleware, deleteCartItemController); // Added delete route

export default router;