import express from 'express';
import { processPaymentController ,getPaymentByIdController} from '../controller/paymentsController.js';
import {cartMiddleware  } from '../middleware/cartMiddleware.js';

const router = express.Router();

// Route to process a payment
router.post('/',cartMiddleware, processPaymentController);

// Route to get a single payment by ID
router.get('/payments/:id', getPaymentByIdController); 

export default router;
