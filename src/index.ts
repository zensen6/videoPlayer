import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ffmpeg from 'fluent-ffmpeg';
import User from './schema/User';
import Video from './schema/Video';
import KMP from './function/kmp_matching';
import path from 'path';
import 'dotenv/config';
import './db.ts';
import { signup, login } from './user';
import cors from 'cors';
import multer from 'multer';

const app = express();
const BASE_URL = __dirname.substr(0, __dirname.length - 3);

app.use(express.static(path.join(BASE_URL, 'client/build')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(
	session({
		secret: process.env.SECRET!,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.DB_URL! })
	})
);
const uploadVideos = multer({ dest: 'uploads/video' });

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
		loggedIn: boolean;
	}
}

app.get('/api/home', async (req, res) => {
	const videoList = await Video.find({}).populate('owner');
	console.log(videoList);
	console.log(123);

	return res.status(200).json(videoList);
});

app.get('*', (req, res) => {
	return res.sendFile(path.join(BASE_URL, 'client/build/index.html'));
});

app.post('/api/test', async (req, res) => {
	//const userlist = await User.find({});
	//console.log(userlist[0]);

	console.log(req.body);
	res.status(200).json({ success: true });
});

app.post('/api/signup', async (req, res) => {
	console.log('signup back');
	console.log(req.body.email);
	const message: any = await signup(req.body);
	if (message === 'success') {
		res.status(200).json({ success: true });
	} else {
		res.status(400).json({ error: message.error });
	}
});

app.post('/api/login', async (req, res) => {
	console.log('login back');
	console.log(req.body.password);
	const result: any = await login(req.body);
	if (result.error === undefined) {
		req.session.user = result;
		req.session.loggedIn = true;
		console.log(req.session.user);
		res.status(200).json({
			auth: true,
			user_id: result._id,
			message: 'You are logged in'
		});
	} else {
		res.status(400).json({ error: result.error });
	}
});

app.post('/api/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(400).json({ error: 'cannot logout' });
		} else {
			res.status(200).json({ success: 'logout done' });
		}
	});
});

const uploadVideo = async (req: any, res: any) => {
	console.log('uploaded video');

	console.log(req.body);
	console.log('---');
	console.log(req.file);
	const { user_id, title, description, author } = req.body;
	const { path } = req.file;
	try {
		// thumbnail
		let thumbsFilePath = '';
		let fileDuration: any;
		ffmpeg.ffprobe(path, function(err, metadata) {
			console.dir(metadata);
			console.log(metadata.format.duration);
			fileDuration = metadata.format.duration;
		});
		ffmpeg(path)
			.on('filenames', function(filenames) {
				console.log('Will generate ' + filenames.join(', '));
				thumbsFilePath = 'uploads/thumbnails/' + filenames[0];
			})
			.on('end', async function() {
				console.log('Screenshots taken');
				const video = new Video({
					author,
					title,
					description,
					fileUrl: path,
					owner: user_id,
					thumbnail: thumbsFilePath
				});
				await video.save();
				const user = await User.findById(user_id);
				if (user) {
					user.videos.push(video._id);
					await user.save();
					return res.status(200).json({
						success: true,
						thumbsFilePath: thumbsFilePath,
						fileDuration: fileDuration
					});
				} else {
					return res.status(400).json({ failure: true });
				}
			})
			.on('error', function(err) {
				console.error(err);
				return res.json({ success: false, err });
			})
			.screenshots({
				// Will take screens at 20%, 40%, 60% and 80% of the video
				count: 3,
				folder: 'uploads/thumbnails',
				size: '320x200',
				// %b input basename ( filename w/o extension )
				filename: 'thumbnail-%b.png'
			});
		//
	} catch (error) {
		console.log(error);
		return res.status(400).json({ failure: true });
	}
};

const videoRouter = express.Router();
app.use('/api/video', videoRouter);
videoRouter.route('/uploadVideo').post(uploadVideos.single('video'), uploadVideo);

app.post('/api/deleteVideo', async (req, res) => {
	const { id } = req.body;
	try {
		await Video.findByIdAndRemove(id);
		return res.status(200).json({ delete: true });
	} catch (error) {
		return res.status(400).json({ delete: false });
	}
});

app.post('/api/siri', async (req, res) => {
	const { text } = req.body;
	const trimedString: String = text.replace(' ', '');
	console.log(trimedString);
	const VideoList = await Video.find({});
	const MatchingList: any = KMP(VideoList, trimedString);
	console.log(MatchingList);
	if (MatchingList.title.length) {
		const rand = Math.floor(Math.random() * MatchingList.title.length);
		console.log(MatchingList.title[rand]);
		const return_video = await Video.findById(MatchingList.title[rand]);
		return res.status(200).json(return_video);
	} else if (MatchingList.author.length) {
		const rand = Math.floor(Math.random() * MatchingList.author.length);
		console.log(MatchingList.author[rand]);
		const return_video = await Video.findById(MatchingList.author[rand]);
		return res.status(200).json(return_video);
	}
	return res.status(400).json({ failure: true });
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`server iss running on http://localhost:${PORT}`);
});

// ts-node-dev: nodemon + ts-node
// ts-node: node xxx 할때 단순히 ts파일 node하는 거라 보면된다.

// npm install express cors mongoose morgan dotenv
// yarn add -D express typescript ts-node nodemon @types/node @types/express ts-node-dev
