// Tạo dữ liệu mẫu cho việc test đăng nhập, token
const bcrypt = require('bcrypt');
const {Users} = require("../models");
const mongoose = require("mongoose");

let dbConnect = () => {
    let connectOptions = process.env.DB_AUTHENTICATION === 'true' ?
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
        } : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

    let db =  mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority',
        connectOptions);

    return db;
}
const db = dbConnect();
UserSeed = async function () {
    Users(db).deleteMany().then(function () {
        console.log("user data is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await Users(db).create([
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
    await db.close();
}
