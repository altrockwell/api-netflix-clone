import app from '../../app';
import request from 'supertest';

describe('product', () => {
	it('returns bad request if first name is missing', async () => {
		const res = await request(app).get('/products');

		expect(res.statusCode).toEqual(200);
	});
});
