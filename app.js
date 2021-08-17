const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Session Managemnt
const session = require('express-session');

//Mongoose
const mongoose = require('mongoose');

// Mongo Session
const MongoStore = require('connect-mongo');

// MongoDB File
const database = require(path.join(__dirname + '/models/db'));

const indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Session Management
app.use(session({
  'name' : 'clink',
  'secret' : "6mEyFi0fxZhdmz2ON26GdZnUCdGIWbCY",
  'resave': false,
  'saveUninitialized': false,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}));

// Routing
app.use('/', indexRouter);

// Connect to MongoDB Database
database.connect();

module.exports = app;
