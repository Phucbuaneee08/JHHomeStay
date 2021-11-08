// Tạo dữ liệu mẫu cho việc test đăng nhập, token
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
            status: 0,
            email: 'hoang@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
            role: 'admin',
        },
        {
            status: 1,
            email: 'minh@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
            role: 'admin',
        },
        {
            status: 1,
            email: 'nhat@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
            role: 'super_admin',
        },
        {
            status: 1,
            email: 'tu@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
            role: 'admin',
        }
    ]);
    console.log('seeded user OK!');
    await dbConnect().close();
}
