import express from 'express';

const app = express();
app.get('/', (req, res) => {
	res.send('123');
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`server iss running on http://localhost:${PORT}`);
});
