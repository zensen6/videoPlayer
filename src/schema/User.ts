import { model, Schema, Model, Document } from 'mongoose';

interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	age: number;
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	age: { type: Number }
});

const User = model<IUser>('User', UserSchema);
export default User;
