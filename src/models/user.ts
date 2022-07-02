import { model, Model, Schema } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	password?: string;
	provider: 'local' | 'google';
}

interface UserModel extends Model<IUser> {
	findUserByEmail: (email: string) => IUser;
}

const userSchema = new Schema<IUser, UserModel>({
	name: { type: String, required: true, min: 3, max: 255 },
	email: { type: String, required: true, min: 10, max: 255 },
	password: { type: String, min: 6, max: 255 },
	provider: { type: String, default: 'local', enum: ['local', 'google'] },
});

userSchema.static('findUserByEmail', async function (email: string) {
	return await this.findOne({ email: email });
});

export default model<IUser, UserModel>('User', userSchema);
