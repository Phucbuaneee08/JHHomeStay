const bcrypt = require('bcrypt');
const {Users} = require("../models");
const mongoose = require("mongoose");
const {dbConnect} = require("../helpers/dbHelper");

exports.UserSeed = async function () {
    Users(dbConnect()).deleteMany().then(function () {
        console.log("user data is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await Users(dbConnect()).create([
        {
            email: 'TuNN@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
            role: 'admin',
            status: 1,
        },
        {
            email: 'Nhatoccho@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
            role: 'superAdmin',
            status: 1,
        }
    ]);
    console.log('seeded user');
}