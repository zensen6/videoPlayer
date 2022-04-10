import mongoose from 'mongoose';
import 'dotenv/config';

async function run(): Promise<void> {
	await mongoose.connect(process.env.DB_URL!, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});
}
run();

const db = mongoose.connection;
const handleOpen = () => console.log('OPEN');
db.on('error', (err) => {
	console.log(`err:${err}`);
});
db.once('open', handleOpen);
