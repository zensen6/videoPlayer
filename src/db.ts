import mongoose from 'mongoose';

(async () =>
	mongoose.connect('mongodb://127.0.0.1:27017/tsnode', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	}))();

const db = mongoose.connection;
const handleOpen = () => console.log('OPEN');
db.on('error', (err) => {
	console.log(`err:${err}`);
});
db.once('open', handleOpen);
