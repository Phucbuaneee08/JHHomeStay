const { Homestays } = require("../models");
const {dbConnect} = require("../helpers/dbHelper");

// Tạo dữ liệu mẫu cho homestays
exports.HomestaysSeed = async function () {
    // Xóa dữ liệu
    Homestays(dbConnect()).deleteMany().then(function () {
        console.log("homestay data is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    // Seed dữ liệu homestays
    await Homestays(dbConnect()).create([
        {
            name: "AN VILLA15",
            price: 5000000,
            type: "Biệt thự",
            address: "Thạch Thất, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Thạch Thất"
        }, {
            name: "Villas",
            price: 4999000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }, {
            name: "Stream House ",
            price: 9500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn"
        }, {
            name: "1001 Lakeside Villas",
            price: 4900000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }, {
            name: "Biệt thự hoa hồng BT4",
            price: 4699000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }, {
            name: "Embossi Garden",
            price: 4000000,
            type: "Nhà riêng",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }, {
            name: "Sóc Sơn Riverside",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn"
        }, {
            name: "Storm Villa",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn"
        }, {
            name: "The Moonlight",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn"
        }, {
            name: "Choai Villa Sóc Sơn",
            price: 4500000,
            type: "Biệt thự",
            address: "Sóc Sơn, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Sóc Sơn"
        }, {
            name: "BAVI Padme Home",
            price: 4500000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }, {
            name: "MARS NNM",
            price: 4500000,
            type: "Khác",
            address: "Thạch Thất, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Thạch Thất"
        }, {
            name: "Xanh Villa 04",
            price: 4500000,
            type: "Biệt thự",
            address: "Thạch Thất, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Thạch Thất"
        }, {
            name: "Rose villa",
            price: 4000000,
            type: "Biệt thự",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }, {
            name: "An Vui Cottage 19 ",
            price: 4000000,
            type: "Khác",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }
    ]);
    console.log('seeded user OK!');
    await dbConnect().close();
}