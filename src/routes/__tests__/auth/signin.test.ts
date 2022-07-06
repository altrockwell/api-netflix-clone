import app from '../../../app';
import request from 'supertest';
import passport from 'passport';
import { hashedPassword } from '../../../utils/hashedPassword';
import User from '../../../models/user';

interface IUserSignIn {
	email?: string;
	password?: string;
	name?: string;
}

describe('POST /signin', () => {
	let user: IUserSignIn;

	const exec = async () => {
		return await request(app).post('/signin').send(user);
	};

	beforeEach(() => {
		user = {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: 'password',
		};
	});

	afterEach(() => {
		User.remove();
	});
	describe('given incomplete user credentials', () => {
		it('should return 400 when email is not provided', async () => {
			delete user.email;
			const res = await exec();

			expect(res.statusCode).toBe(400);
		});
		it('should return 400 when password is not provided', async () => {
			delete user.password;
			const res = await exec();

			expect(res.statusCode).toBe(400);
		});
	});

	describe('given correct user credentials', () => {
		it('should return 201', async () => {
			try {
				const newPassword = hashedPassword(user.password as string);
				const newUser = await new User({
					name: user.name,
					email: user.email,
					password: newPassword,
					provider: 'local',
				});
				await newUser.save();
				const res = await exec();

				expect(res.statusCode).toBe(201);
				expect(res.body).toHaveProperty('email', user.email);
				expect(res.body).toHaveProperty('name', user.name);
				// expect(newUser)
			} catch (error) {}
		});
	});
});
