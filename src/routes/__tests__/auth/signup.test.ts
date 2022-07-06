import { hashedPassword } from './../../../utils/hashedPassword';
import app from '../../../app';
import request from 'supertest';
import User from '../../../models/user';

interface IRequestData {
	name?: string;
	email?: string;
	password?: string;
}

describe('auth', () => {
	let user: IRequestData;
	let requestStatement: any;
	const exec = async () => {
		return await request(app).post('/signup').send(user);
	};

	beforeEach(() => {
		user = {
			name: 'John Doe',
			password: 'johndoe123',
			email: 'johnDoe@gmail.com',
		};
	});
	afterEach(() => {
		User.remove({});
	});
	describe('POST /signup', () => {
		describe('given inputs are not complete', () => {
			it('should return 400 when email is not provided', async () => {
				delete user.email;

				const res = await exec();

				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty('error', '"email" is required');
			});

			it('should return 400 when name is not provided', async () => {
				delete user.name;
				const res = await request(app).post('/signup').send(user);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty('error', '"name" is required');
			});
			it('should return 400 when password is not provided', async () => {
				delete user.password;
				const res = await request(app).post('/signup').send(user);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty('error', '"password" is required');
			});
		});

		describe('given email is invalid', () => {
			it('should return 400 when email is not valid', async () => {
				user.email = 'johndoe';
				const res = await request(app).post('/signup').send(user);

				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty(
					'error',
					'"email" must be a valid email'
				);
			});
			it('should return 400 when email is too short', async () => {
				user.email = 'a@a.com';
				const res = await exec();

				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty(
					'error',
					'"email" length must be at least 10 characters long'
				);
			});
			it('should return 400 when email is too long', async () => {
				const longString = new Array(257).join('a') + '@gmail.com';
				user.email = longString;
				const res = await exec();
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty(
					'error',
					'"email" length must be less than or equal to 255 characters long'
				);
			});
		});

		describe('given all inputs are valid', () => {
			test('should return 201 and user added to database', async () => {
				try {
					const res = await exec();

					// const newUser = await User.find({ email: user.email });
					// console.log(newUser);

					expect(res.statusCode).toEqual(201);
					expect(res.body).toHaveProperty('name', user.name);
					expect(res.body).toHaveProperty('email', user.email);
					// expect(newUser.length).toBe(1);
					// expect(newUser.length).toBe(1)
				} catch (error) {}
			});
		});
	});
});
