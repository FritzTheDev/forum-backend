'use strict';
//environment variable folder
require('dotenv').config();
//imports
const app = require('express')();
const cors = require('cors');
const mongooose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

//node path module
const path = require('path');

//mongoose
mongooose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (error) => {
    if (error) throw error;
});

mongooose.connection.on("error", (err) => {
    console.log('Mongo Error: ' + err);
});

//global middlewares
//logger
app.use(logger("short"));

//http json request body parser
app.use(bodyParser.json());

//cross origin resource sharing
app.use(cors());

app.use('/user', userRoutes);

module.exports = app;