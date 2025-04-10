import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import comingsoonRouter from './routes/comingsoonRouter.js';
import moviesRouter from './routes/moviesRouter.js';
import usersRouter from './routes/usersRouter.js';
import cartRouter from './routes/cartRouter.js';
import paymentsRouter from './routes/paymentsRouter.js'
import { cartMiddleware } from './middleware/cartMiddleware.js'; 

config();
const app = express();

app.use(cors());
app.use(express.json());

// Define routes
app.use('/coming_soon', comingsoonRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.use('/cart', cartMiddleware, cartRouter); // Apply the cartMiddleware
app.use('/payments',paymentsRouter)

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001');
});