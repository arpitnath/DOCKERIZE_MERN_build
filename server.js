require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');

//parser
const bodyParser = require('body-parser');
//cors
const cors = require('cors');

//routes
const item = require('./routes/item');

//middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
	console.log('connected to DB');
});

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');

	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

		return res.status(200).json({
			statusMessage: 'ok',
		});
	}

	next();
});
server.use('/', item);

server.use((req, res, next) => {
	const error = new Error('Unable to manage the request');

	error.status = 404;

	next(error);
});

server.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
	console.log('Server is running @ localhost:8000');
});
