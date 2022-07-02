import express from 'express';
import product from './routes/product';
import auth from './routes/auth';

const app = express();
app.use(express.json());
app.use('/', auth);
app.use('/products', product);

export default app;
