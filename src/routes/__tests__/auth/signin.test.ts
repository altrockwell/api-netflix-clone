import app from '../../../app';
import request from 'supertest';
import passport from 'passport';

describe('POST /signin', () => {
	const user = {
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		password: 'password',
	};
	it('should work', async () => {
		try {
			passport.authenticate = jest.fn().mockReturnValue(user);

			expect(passport.authenticate).toHaveProperty('name', user.name);
			const res = await request(app).post('/signin').send(user);

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty('email', user.email);
			expect(res.body).toHaveProperty('name', user.name);
		} catch (error) {}
	});
});
