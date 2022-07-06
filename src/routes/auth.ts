import express from 'express';
import Joi from 'joi';
import { hashedPassword } from '../utils/hashedPassword';
import User, { IUser, validateNewUser } from '../models/user';
import passport from 'passport';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { error } = validateNewUser(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	try {
		const hashed = await hashedPassword(req.body.password);
		const newUser = await new User({
			name: req.body.name,
			email: req.body.email,
			password: hashed,
			provider: 'local',
		});
		await newUser.save();
		return res.status(201).json(newUser);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
	return res.status(201).json(req.user);
});

router.get(
	'/login/federated/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/google-success',
		failureRedirect: '/google-failed',
	})
);
router.get('/google-success', isAuthenticated, (req, res) => {
	res.status(200).json({ user: req.user });
});
router.get('/google-failed', (req, res) => {
	res.status(400).send('auth failed');
});
router.post('/logout', isAuthenticated, (req, res, next) => {
	req.logOut(function (err) {
		if (err) {
			return res.status(400);
		}
		return res.status(201);
	});
});
export default router;
