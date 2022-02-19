import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import User from './schema/User';
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

app.get('/', async (req, res) => {
	const userlist = await User.find({});
	console.log(userlist);
	return res.sendFile(path.join(BASE_URL, 'client/build/index.html'));
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

const uploadVideo = (req: any, res: any) => {
	console.log('uploaded video');
	console.log(req.body);
	console.log(req.file);
	res.status(200).json({ success: true });
};

const videoRouter = express.Router();
app.use('/api/video', videoRouter);
videoRouter.route('/uploadVideo').post(uploadVideos.single('video'), uploadVideo);

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`server iss running on http://localhost:${PORT}`);
});

// ts-node-dev: nodemon + ts-node
// ts-node: node xxx 할때 단순히 ts파일 node하는 거라 보면된다.

// npm install express cors mongoose morgan dotenv
// yarn add -D express typescript ts-node nodemon @types/node @types/express ts-node-dev
