// Tạo dữ liệu mẫu cho các homestays
const {Homestays, Photos} = require("../models");
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

let HomestaysSeed = async function () {
    Homestays(db).deleteMany().then(function () {
        console.log("Homestays is cleared");
    }).catch(function (error) {
        console.log(error);
    });
    
    Photos(db).deleteMany().then(function () {
        console.log("Photos is cleared");
    }).catch(function (error) {
        console.log(error);
    });

    /** danh sách homestays phải đúng thứ tự với danh sách url ở dưới */
    let homestays =  await Homestays(db).create([
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
            name: "Oriana Villa Đà Lạt 102",
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
            name: "RỐN STUDIO",
            price: 800000,
            type:"Căn hộ Studio",
            address:"Đà Lạt, Lâm Đồng, Việt Nam",
            province:"Lâm Đồng",
            district:"Đà Lạt"
        },
        // minh
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
            name: "Stream House",
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
            name: "An Vui Cottage 19",
            price: 4000000,
            type: "Khác",
            address: "Ba Vì, Hà Nội, Vietnam",
            province: "Hà Nội",
            district: "Ba Vì"
        }
    ]);

    /** danh sách url phải đúng thứ tự với danh sách homestays ở trên */
    let photoUrls = [
        "../upload/homestays-photos/999 CONDOTEL Muong Thanh Vien Trieu.jpg",
        "../upload/homestays-photos/Scenia Bay Residences Nha Tran.jpg",
        "../upload/homestays-photos/Wonderland 24H Apartments.jpg",
        "../upload/homestays-photos/Shoho Hotel Nha Trang.jpg",
        "../upload/homestays-photos/Diamond Villa.jpg",
        "../upload/homestays-photos/Relaxing 2 BR Apartment.jpg",
        "../upload/homestays-photos/Paralia Nha Trang.jpg",
        "../upload/homestays-photos/LeJardin De Papa.jpg",
        "../upload/homestays-photos/Oriana Villa Đà Lạt 102.jpg",
        "../upload/homestays-photos/Le Petit Prince.jpg",
        "../upload/homestays-photos/Nhà Mình homestay.jpg",
        "../upload/homestays-photos/Cối Xay Gió Homestay and Coffee.jpg",
        "../upload/homestays-photos/Blue Light - Villa.jpg",
        "../upload/homestays-photos/H-Long Hotel Dalat.jpg",
        "../upload/homestays-photos/RỐN STUDIO.jpg",
        "../upload/homestays-photos/AN VILLA15.jpg",
        "../upload/homestays-photos/Villas.jpg",
        "../upload/homestays-photos/Stream House.jpg",
        "../upload/homestays-photos/1001 Lakeside Villas.jpg",
        "../upload/homestays-photos/Biệt thự hoa hồng BT4.jpg",
        "../upload/homestays-photos/Embossi Garden.jpg",
        "../upload/homestays-photos/Sóc Sơn Riverside.jpg",
        "../upload/homestays-photos/Storm Villa.jpg",
        "../upload/homestays-photos/The Moonlight.jpg",
        "../upload/homestays-photos/Choai Villa Sóc Sơn.jpg",
        "../upload/homestays-photos/BAVI Padme Home.jpg",
        "../upload/homestays-photos/MARS NNM.jpg",
        "../upload/homestays-photos/Xanh Villa 04.jpg",
        "../upload/homestays-photos/Rose villa.jpg",
        "../upload/homestays-photos/An Vui Cottage 19.jpg",
    ]

    // Lưu và cập nhật _id vào mỗi documents (bidirectional)
    for(let i = 0; i < homestays.length; i++) {
        let photo = await Photos(db).create({
            url: photoUrls[i],
            homestays: homestays[i]._id,
        })
        // cập nhật _id của photo vào homestays
        await Homestays(db).findByIdAndUpdate(homestays[i]._id,
            {$push: {photos: photo._id}})
    }
    console.log('seeded user OK!');
    await db.close();
}

HomestaysSeed().catch(error => {
    console.log(error)
});