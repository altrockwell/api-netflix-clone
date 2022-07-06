import { Application } from 'express';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import passportConfig from '../config/passport';
import morgan from 'morgan';
import cors from 'cors';

export default function (app: Application) {
	app.use(morgan('tiny'));
	passportConfig(passport);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(flash());
	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'secret',
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(
		cors({
			credentials: true,
		})
	);
}
