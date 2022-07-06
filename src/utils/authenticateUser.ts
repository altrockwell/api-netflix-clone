import { VerifyCallback } from 'passport-google-oauth2';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const authenticateLocalUser = async (
	email: string,
	password: string,
	done: VerifyCallback
) => {
	const user = await User.findUserByEmail(email);
	if (user == null) {
		return done(null, false, { message: 'No user with that email' });
	}

	try {
		if (await bcrypt.compare(password, user.password)) {
			return done(null, user);
		} else {
			return done(null, false, { message: 'Password incorrect' });
		}
	} catch (e) {
		return done(e);
	}
};

export const authenticateGoogleUser = async (
	request: Request,
	accessToken: string,
	refreshToken: string,
	profile: any,
	done: VerifyCallback
) => {
	let user;
	user = await User.findUserByEmail(profile.email);
	if (!user) {
		user = await new User({
			email: profile.email,
			name: profile.displayName,
			provider: 'google',
		});
		await user.save();
	}
	console.log(user);

	return done(null, user);
};
