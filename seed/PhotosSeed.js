const { Photos } = require("../models");
const {dbConnect} = require("../helpers/dbHelper");

// Tạo dữ liệu cho Schema Photos, chứa URL các ảnh của homestay và room
exports.PhotosSeed = async function () {
    // Xóa dữ liệu ban đầu
    Photos(dbConnect()).deleteMany().then(function () {
        console.log("homestay data is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    // Seed dữ liệu
    await Photos(dbConnect()).create([
        {
            url: "../upload/homestays_photos/1001LakesideVillas.jpg"
        },{
            url: "../upload/homestays_photos/AnVilla15.jpg"
        },{
            url: "../upload/homestays_photos/AnVuiCottage19.jpg"
        },{
            url: "../upload/homestays_photos/BAVIPadmeHome.jpg"
        },{
            url: "../upload/homestays_photos/BietthuhoahongBT4.jpg"
        },{
            url: "../upload/homestays_photos/ChoaiVillaSocSon.jpg"
        },{
            url: "../upload/homestays_photos/EmbossiGarden.jpg"
        },{
            url: "../upload/homestays_photos/MARSNNM.jpg"
        },{
            url: "../upload/homestays_photos/RoseVilla.jpg"
        },{
            url: "../upload/homestays_photos/SocSonRiverside.jpg"
        },{
            url: "../upload/homestays_photos/StormVilla.jpg"
        },{
            url: "../upload/homestays_photos/StreamHouse.jpg"
        },{
            url: "../upload/homestays_photos/TheMoonlight.jpg"
        },{
            url: "../upload/homestays_photos/Villas.jpg"
        },{
            url: "../upload/homestays_photos/XanhVilla04.jpg"
        },
    ]);
    console.log('seeded user OK!');
    await dbConnect().close();
}