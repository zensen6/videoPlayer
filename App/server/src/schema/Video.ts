import { Schema, model, connect, Mongoose, Types } from 'mongoose';

interface Video {
	author: string;
	title: string;
	fileUrl: string;
	description?: string;
	owner: Types.ObjectId;
	thumbnail: string;
}

const schema = new Schema<Video>({
	author: { type: String, required: true },
	title: { type: String, required: true },
	fileUrl: { type: String, required: true },
	description: String,
	owner: { type: 'ObjectId', ref: 'User' },
	thumbnail: String
});

const Video = model<Video>('Video', schema);
export default Video;
