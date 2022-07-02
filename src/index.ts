import app from './app';
import mongoose from 'mongoose';

import config from './config';

app.listen(config.app.port, async () => {
	console.log(`Server listening on port ${config.app.port}`);
	mongoose
		.connect(config.mongodb.uri, config.mongodb.configOptions)
		.then(() => console.log(`Connected to ${config.mongodb.uri}`))
		.catch((error) => console.log(error));
});
