var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require("i18n");
var cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const { swaggerJsonData } = require("./api-docs/swagger.js");
// import routers here

require('dotenv').config();

var app = express();

const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
};

process.env.TZ = 'Asia/Ho_Chi_Minh';

app.use('/upload', express.static('upload'));
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
const router = express.Router();
//router.use( "/auth", require("./modules/auth/auth.route"));

// Trỏ tới router ở file information-homestays
//router.use( "/homestays", require("./modules/user/homestays/user.homestays.route"));

// Trỏ tới router ở file booking-homestays
router.use("/admins", require("./modules/admin/bills/admin.bills.route"));

// Trỏ tới router ở file update-homestays
router.use('/admins',require('./modules/admin/homestays/admin.homestays.route'));

//Trỏ tới router ở file create-bills
router.use('/users',require('./modules/user/bills/user.bill.router'));

// api docs here
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonData));
app.use(router);

module.exports = app;

