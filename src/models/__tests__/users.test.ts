import User from '../user';

describe('getUserByEmail', () => {
	afterEach(() => {
		User.remove();
	});
	it('should return user', async () => {
		try {
			const newUser = await new User({
				name: 'John Doe',
				email: 'johndoe@gmail.com',
				provider: 'local',
			});
			await newUser.save();
			const result = await User.findUserByEmail('johndoe@gmail.com');
			console.log(newUser);
			expect(result).toHaveProperty('name', 'John Doe');
			expect(result).toHaveProperty('email', 'johndoe@gmail.com');
		} catch (error) {}
	});
});
