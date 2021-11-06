const bcrypt = require('bcrypt');

const {Users} = require("../models");
const mongoose = require("mongoose");

exports.UserSeed = async function () {
    Users(DB_CONNECTION).deleteMany().then(function () {
        console.log("user data is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await Users(DB_CONNECTION).create([
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
    await Users(DB_CONNECTION).base.close();
}