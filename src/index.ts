import express from 'express';
import morgan from 'morgan';
import User from './schema/User';
import './db.ts';

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	const userlist = await User.find({});
	console.log(userlist);
	return res.send('1');
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`server iss running on http://localhost:${PORT}`);
});

// ts-node-dev: nodemon + ts-node
// ts-node: node xxx 할때 단순히 ts파일 node하는 거라 보면된다.

// npm install express cors mongoose morgan dotenv
// yarn add -D express typescript ts-node nodemon @types/node @types/express ts-node-dev
