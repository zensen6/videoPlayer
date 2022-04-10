import { model, Schema, Model, Document, Types } from 'mongoose';

interface IUser {
	email: string;
	name: string;
	password: string;
	videos: [Types.ObjectId];
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	videos: [ { type: 'ObjectId', ref: 'Video' } ]
});

const User = model<IUser>('User', UserSchema);
export default User;
