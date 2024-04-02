require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const newsRouter = require('../routes/newsRouter');
const picsRouter = require('../routes/picsRouter');

// SETTINGS
const { PORT = 8080 } = process.env;

// MIDDLEWARES
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(cors());

// CONNECT TO MONGODB
const { DATABASE: URI } = process.env;

const connectMongo = async () => {
	try {
		await mongoose.connect(URI);
		console.log('Database connected.');
	} catch (err) {
		console.log(err);
	};
};

connectMongo();

mongoose.connection.on('error', err => {
	console.error(err.message);
});

// ROUTES
app.use('/api', newsRouter);
app.use('/api', picsRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static("../client/dist"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
	});
};

// STARTING SERVER
app.listen(PORT, () => {
	console.log(`Server at port ${PORT}`);
});