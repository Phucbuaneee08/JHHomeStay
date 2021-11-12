// Tạo dữ liệu mẫu cho các homestays
const bcrypt = require('bcrypt');
const {Homestays} = require("../models");
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

let HomestaySeed = async function () {
    Homestays(db).deleteMany().then(function () {
        console.log("user data is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    await Homestays(db).create([
        {
            name: "999 CONDOTEL Mường Thanh Viễn Triều",
            price: 999000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
        },
        {
            name: "Scenia Bay Residences Nha Trang",
            price: 1357000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
        },
        {
            name: "Wonderland 24H Apartments",
            price: 899000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang"
        },
        {
            name: "Shoho Hotel Nha Trang",
            price: 200000,
            type:"Hotel",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang"
        },
        {
            name: "Diamond Villa",
            price: 3700000,
            type:"Biệt thự",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang"
        },
        {
            name: "Relaxing 2 BR Apartment",
            price: 859000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang"
        },
        {
            name: "Paralia Nha Trang",
            price: 949000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang"
        },
        {
            name: "LeJardin De Papa",
            price: 250000,
            type:"Nhà riêng",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: "Oriana Villa Đà Lạt 102 ",
            price: 300000,
            type:"Biệt thự",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: "Le Petit Prince",
            price: 1400000,
            type:"Căn hộ",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: "Nhà Mình homestay",
            price: 830000,
            type:"Khác",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: "Cối Xay Gió Homestay and Coffee",
            price: 600000,
            type:"Khác",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: "Blue Light - Villa",
            price: 3100000,
            type:"Biệt thự",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: "H-Long Hotel Dalat",
            price: 740000,
            type:"Nhà riêng",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        {
            name: " RỐN STUDIO",
            price: 800000,
            type:"Căn hộ Studio",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
    ]);
    console.log('seeded user OK!');
    await db.close();
}

// UserSeed().catch(error => {
//     console.log(error)
// });