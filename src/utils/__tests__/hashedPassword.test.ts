import { hashedPassword } from '../hashedPassword';

describe('hashedPassword', () => {
	it('should not return original password', () => {
		const password = '123456';
		expect(hashedPassword(password)).not.toBe(password);
	});
});
