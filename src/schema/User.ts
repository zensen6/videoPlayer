import { model, Schema, Model, Document } from 'mongoose';

interface IUser {
	email: string;
	name: string;
	password: string;
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true }
});

const User = model<IUser>('User', UserSchema);
export default User;
