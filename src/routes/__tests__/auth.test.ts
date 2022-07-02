import { hashedPassword } from './../../utils/hashedPassword';
import app from '../../app';
import request from 'supertest';
import User from '../../models/user';

interface IRequestData {
	name?: string;
	email?: string;
	password?: string;
}

describe('auth', () => {
	let requestData: IRequestData;
	let requestStatement: any;
	const exec = async () => {
		return await request(app).post('/signup').send(requestData);
	};

	beforeEach(() => {
		requestData = {
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
				delete requestData.email;

				const res = await exec();

				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty('error', '"email" is required');
			});

			it('should return 400 when name is not provided', async () => {
				delete requestData.name;
				const res = await request(app).post('/signup').send(requestData);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty('error', '"name" is required');
			});
			it('should return 400 when password is not provided', async () => {
				delete requestData.password;
				const res = await request(app).post('/signup').send(requestData);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty('error', '"password" is required');
			});
		});

		describe('given email is invalid', () => {
			it('should return 400 when email is not valid', async () => {
				requestData.email = 'johndoe';
				const res = await request(app).post('/signup').send(requestData);
				console.log(res.body);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty(
					'error',
					'"email" must be a valid email'
				);
			});
			it('should return 400 when email is too short', async () => {
				requestData.email = 'a@a.com';
				const res = await request(app).post('/signup').send(requestData);
				console.log(res.body);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty(
					'error',
					'"email" length must be at least 10 characters long'
				);
			});
			it('should return 400 when email is too long', async () => {
				const longString = new Array(257).join('a') + '@gmail.com';
				requestData.email = longString;
				const res = await request(app).post('/signup').send(requestData);
				expect(res.statusCode).toEqual(400);
				expect(res.body).toHaveProperty(
					'error',
					'"email" length must be less than or equal to 255 characters long'
				);
			});
		});

		describe('given all inputs are valid', () => {
			test('should return 201', async () => {
				const hashed = hashedPassword(requestData.password as string);
				await new User({
					name: requestData.name,
					email: requestData.email,
					password: hashed,
				});
				const res = await exec();
				expect(res.statusCode).toEqual(201);
			});
		});

		// Check if password is hashed
		// Return 400 if email is already exist in db
		// Return 201 if request is validate
		// Save user in the DB
		// Return user
	});
});
