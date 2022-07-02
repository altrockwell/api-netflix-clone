import express from 'express';
import Joi from 'joi';
import { hashedPassword } from '../utils/hashedPassword';
import User from '../models/user';
import passport from 'passport';

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

// router.post('/signin', (req, res, next) => {
// 	passport.authenticate('local', (err, user, info) => {
// 		console.log(err);
// 		console.log(user);
// 		console.log(info);
// 	})(req, res, next);
// 	res.status(200);
// });
router.post('/signin', passport.authenticate('local'), (req, res) => {
	console.log('user', req.user);
});

interface IUser {
	name: string;
	email: string;
	password: string;
}

const validateNewUser = (user: IUser) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		email: Joi.string()
			.email({ ignoreLength: true })
			.min(10)
			.max(255)
			.required()
			.lowercase(),
		password: Joi.string().min(6).max(255).alphanum().required(),
	});

	return schema.validate(user);
};

export default router;
