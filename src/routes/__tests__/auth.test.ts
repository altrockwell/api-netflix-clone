import app from '../../app';
import request from 'supertest';

describe('auth', () => {
	describe('POST /signup', () => {
		describe('given input is not given', () => {
			it('should return 400', async () => {
				const res = await request(app).get('/signup');
				expect(res.statusCode).toEqual(400);
			});
		});
	});
	describe('POST /signup', () => {
		describe('given input is not given', () => {
			it('should return 400', async () => {
				const res = await request(app).get('/signup');
				expect(res.statusCode).toEqual(400);
			});
		});
	});
});
