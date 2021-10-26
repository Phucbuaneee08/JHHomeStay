var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require("i18n");
var cors = require('cors');

// import routers here

require('dotenv').config();

var app = express();

const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
};

process.env.TZ = 'Asia/Ho_Chi_Minh';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

i18n.configure({
    locales:['en', 'vi'],
    directory: path.join(__dirname, 'locales')
});
app.use(i18n.init);

// user routers here

module.exports = app;
