// Tạo dữ liệu mẫu cho việc lấy dữ liệu ảnh cho homestays
const bcrypt = require('bcrypt');
const {Photos} = require("../models");
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

let UserSeed = async function () {
    Photos(db).deleteMany().then(function () {
        console.log("user data is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await Photos(db).create([
        {url: "../upload/homestays_photos/999 CONDOTEL Muong Thanh Vien Trieu.jpg"},
        {url: "../upload/homestays_photos/Blue Light - Villa.jpg"},
        {url: "../upload/homestays_photos/Coi Xay Gio Homestay and Coffee.jpg"},
        {url: "../upload/homestays_photos/Diamond Villa.jpg"},
        {url: "../upload/homestays_photos/H-Long Hotel Dalat.jpg"},
        {url: "../upload/homestays_photos/Le Petit Prince.jpg"},
        {url: "../upload/homestays_photos/LeJardin De Papa.jpg"},
        {url: "../upload/homestays_photos/Nha Minh homestay.jpg"},
        {url: "../upload/homestays_photos/Oriana Villa Da Lat 102.jpg"},
        {url: "../upload/homestays_photos/Paralia Nha Trang.jpg"},
        {url: "../upload/homestays_photos/Relaxing 2 BR Apartment.jpg"},
        {url: "../upload/homestays_photos/RON STUDIO.jpg"},
        {url: "../upload/homestays_photos/Shoho Hotel Nha Trang.jpg"},
        {url: "../upload/homestays_photos/Wonderland 24H Apartments.jpg"},
        {url: "../upload/homestays_photos/Scenia Bay Residences Nha Tran.jpg"},
    ]);
    console.log('seeded user OK!');
    await db.close();
}

// UserSeed().catch(error => {
//     console.log(error)
// });