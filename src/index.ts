import express from 'express';
import morgan from 'morgan';
import User from './schema/User';
import path from 'path';
import './db.ts';

const app = express();
const BASE_URL = __dirname.substr(0, __dirname.length - 3);

app.use(express.static(path.join(BASE_URL, 'client/build')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	const userlist = await User.find({});
	console.log(userlist);
	return res.sendFile(path.join(BASE_URL, 'client/build/index.html'));
});

app.get('*', (req, res) => {
	return res.sendFile(path.join(BASE_URL, 'client/build/index.html'));
});

app.post('/api/test', (req, res) => {
	console.log(req.body);
	res.status(200).json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`server iss running on http://localhost:${PORT}`);
});

// ts-node-dev: nodemon + ts-node
// ts-node: node xxx 할때 단순히 ts파일 node하는 거라 보면된다.

// npm install express cors mongoose morgan dotenv
// yarn add -D express typescript ts-node nodemon @types/node @types/express ts-node-dev
