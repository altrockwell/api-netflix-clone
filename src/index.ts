import app from './app';
import mongoose from 'mongoose';

app.listen(8080, async () => {
	console.log(`Server listening on port 8080`);
	mongoose
		.connect('mongodb://localhost:27017/test')
		.then(() => console.log('Connected to db'))
		.catch((error) => console.log(error));
});
