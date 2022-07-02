import express from 'express';
import product from './routes/product';
import auth from './routes/auth';
import middlewares from './startapp/middlewares';
import path from 'path';

const app = express();

// configure env file base on app environment
require('dotenv').config({
	path: path
		.join(__dirname, '..', `${app.get('env').env}`)
		.split(' ')
		.join(''),
});

middlewares(app);

app.use('/', auth);
app.use('/products', product);

export default app;
