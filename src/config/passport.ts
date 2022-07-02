import { PassportStatic } from 'passport';
import { VerifyCallback } from 'passport-google-oauth2';
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Request } from 'express';
import User from '../models/user';
import {
	authenticateLocalUser,
	authenticateGoogleUser,
} from '../utils/authenticateUser';

export default function initialize(passport: PassportStatic) {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, authenticateLocalUser)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'http://localhost:8000/auth/google/callback',
				passReqToCallback: true,
			},
			authenticateGoogleUser
		)
	);
	passport.serializeUser((user: any, done: VerifyCallback) =>
		done(null, user)
	);
	passport.deserializeUser((user: any, done: VerifyCallback) => {
		return done(null, user);
	});
}
