const {Homestays, Photos, GeneralServices, Services} = require("../models");
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
    // Cơ sở dữ liệu Atlas
    /*
    let db =  mongoose.createConnection('mongodb+srv://jadehillhomestays:1234@cluster0.nwvtu.mongodb.net/jadehillhomestays?retryWrites=true&w=majority',
        connectOptions);  */
    // Cơ sở dữ liệu cục bộ
    let db =  mongoose.createConnection('mongodb://localhost:27017/JadeHillHomestays',
        connectOptions);
    return db;
}
const db = dbConnect();
// Tạo dữ liệu mẫu cho các homestays, khi seed chuyển let thành exports.   , còn ko thì chuyển lại thành let
exports.HomestaysSeed = async function () {
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
        {// Làm 10 cái phía dưới nhá, làm theo mẫu dưới đây nhá
            name: "999 CONDOTEL Mường Thanh Viễn Triều",
            price: 999000,
            type:"Căn hộ",
            address:"Nha Trang, Khánh Hòa, Vietnam",
            province:"Khánh Hòa",
            district:"Nha Trang",
            description:"Tóm tắt về 999 CONDOTEL Mường Thanh Viễn Triều\n Vị trí rất đẹp và thuận tiện ở Nha Trang\n Gần công viên Nha Trang, Lotteria, trung tâm mua sắm với môi trường ngoài trời yên tĩnh\n Bạn hoàn toàn có thể trải nghiệm những dịch vụ cao cấp tại đây",
            available: 3,
            rates: [
                {
                    cleanRate: 4,
                    serviceRate: 4,
                    valueRate: 5,
                    accuracyRate: 5,
                    description: "Dịch vụ của Homestay rất tốt",
                    userName: "Minh",
                    createdAt: new Date("12/08/2019")
                },
            ]
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
        },
        // Hoang
        {
            name: "Full House Condotel",
            price: 1650000,
            type: "Căn hộ chung cư",
            address: "Đà Lạt, Lâm Đồng, Vietnam ",
            province: "Lâm Đồng",
            district: "Đà Lạt"
        }, {
            name: "Luxury Villa in supercentral",
            price: 2050000,
            type: "Biệt thự",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu"
        }, {
            name: "Icity Villa Riverfront Danang",
            price: 8500000,
            type: "Biệt thự",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu"
        }, {
            name: "Kaia Residence - Private Terrace - Secret Garden",
            price: 1140000,
            type: "Căn hộ Studio",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu"
        }, {
            name: "Ocean View Home 2736",
            price: 1500000,
            type: "Căn hộ chung cư",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn"
        }, {
            name: "T P Villa",
            price: 3500000,
            type: "Biệt thự",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn"
        }, {
            name: "MAI VILLA DA NANG",
            price: 699000,
            type: "Biệt thự",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn"
        }, {
            name: "Muong Thanh Apartment Sea View",
            price: 800000,
            type: "Căn hộ dịch vụ",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn"
        }, {
            name: "Suit family apartment",
            price: 850000,
            type: "Căn hộ dịch vụ",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu"
        }, {
            name: "Tropical House Apartment",
            price: 730000,
            type: "Căn hộ dịch vụ",
            address: "Sơn Trà, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Sơn Trà"
        }, {
            name: "Top Hotel Apartment",
            price: 650000,
            type: "Căn hộ dịch vụ",
            address: "Sơn Trà, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Sơn Trà"
        }, {
            name: "Bong Villa",
            price: 3300000,
            type: "Biệt thự",
            address: "Sơn Trà, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Sơn Trà"
        }, {
            name: "Rolex",
            price: 1700000,
            type: "Căn hộ Studio",
            address: "Hải Châu, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Hải Châu"
        }, {
            name: "ARITA RIVERA",
            price: 1300000,
            type: "Căn hộ dịch vụ",
            address: "Ngũ Hành Sơn, Đà Nẵng, Vietnam",
            province: "Đà Nẵng",
            district: "Ngũ Hành Sơn"
        },{
            name: "B245 VILLA VUNG TAU",
            price: 5500000,
            type: "Biệt thự",
            address: "Vũng Tàu, Bà Rịa Vũng Tàu, Vietnam",
            province: "Bà Rịa Vũng Tàu",
            district: "Vũng Tàu"
        },
        //Nhat
        {
            name: "The 1993 Hoi An",
            price: 420000,
            type: "Nhà riêng",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Hai Au Boutique",
            price: 750000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "De An Hoi An",
            price: 560000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Mali Villa",
            price: 3000000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Ancient River Villa",
            price: 400000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Dao Tien homestay",
            price: 550000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "La Vista Villa Hoi An",
            price: 320000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "ABA TRAVEL VILLA",
            price: 380000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Bespoke Villa",
            price: 350000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Double Luxury Room",
            price: 400000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Santori Homestay",
            price: 5000000,
            type: "Biệt thự",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Flame Flowers Homestay",
            price: 480000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "YLANG GARDEN VILLA",
            price: 9000000,
            type: "Căn hộ dịch vụ",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Open Balcony",
            price: 500000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        },{
            name: "Hoi An Majestic villa",
            price: 850000,
            type: "Khác",
            address: "Hội An, Quảng Nam, Việt Nam",
            province: "Quảng Nam",
            district: "Hội An"
        }
    ]);

    /** danh sách url phải đúng thứ tự với danh sách homestays ở trên */
    let photoUrls = [
        "/upload/homestays-photos/999 CONDOTEL Muong Thanh Vien Trieu.jpg",
        "/upload/homestays-photos/Scenia Bay Residences Nha Tran.jpg",
        "/upload/homestays-photos/Wonderland 24H Apartments.jpg",
        "/upload/homestays-photos/Shoho Hotel Nha Trang.jpg",
        "/upload/homestays-photos/Diamond Villa.jpg",
        "/upload/homestays-photos/Relaxing 2 BR Apartment.jpg",
        "/upload/homestays-photos/Paralia Nha Trang.jpg",
        "/upload/homestays-photos/LeJardin De Papa.jpg",
        "/upload/homestays-photos/Oriana Villa Da Lat 102.jpg",
        "/upload/homestays-photos/Le Petit Prince.jpg",
        "/upload/homestays-photos/Nha Minh homestay.jpg",
        "/upload/homestays-photos/Coi Xay Gio Homestay and Coffee.jpg",
        "/upload/homestays-photos/Blue Light - Villa.jpg",
        "/upload/homestays-photos/H-Long Hotel Dalat.jpg",
        "/upload/homestays-photos/RON STUDIO.jpg",
        "/upload/homestays-photos/AN VILLA15.jpg",
        "/upload/homestays-photos/Villas.jpg",
        "/upload/homestays-photos/Stream House.jpg",
        "/upload/homestays-photos/1001 Lakeside Villas.jpg",
        "/upload/homestays-photos/Biệt thự hoa hồng BT4.jpg",
        "/upload/homestays-photos/Embossi Garden.jpg",
        "/upload/homestays-photos/Sóc Sơn Riverside.jpg",
        "/upload/homestays-photos/Storm Villa.jpg",
        "/upload/homestays-photos/The Moonlight.jpg",
        "/upload/homestays-photos/Choai Villa Sóc Sơn.png",
        "/upload/homestays-photos/BAVI Padme Home.jpg",
        "/upload/homestays-photos/MARSNNM.png",
        "/upload/homestays-photos/Xanh Villa 04.jpg",
        "/upload/homestays-photos/Rose villa.jpg",
        "/upload/homestays-photos/An Vui Cottage 19.jpg",
        //hoang
        "/upload/homestays-photos/fullhousecondotel_1.png",
        "/upload/homestays-photos/luxuryvillainsupercentral_1.jpg",
        "/upload/homestays-photos/icityvillariverfrontdanang_1.jpg",
        "/upload/homestays-photos/kaiaresidenceprivateterracesecretgarden_1.jpg",
        "/upload/homestays-photos/oceanviewhome2736_1.jpg",
        "/upload/homestays-photos/tpvilla_1.jpg",
        "/upload/homestays-photos/maivilladanang_1.jpg",
        "/upload/homestays-photos/muongthanhapartmentseaview_1.jpg",
        "/upload/homestays-photos/suitfamilyapartment_1.jpg",
        "/upload/homestays-photos/tropicalhouseapartment_1.jpg",
        "/upload/homestays-photos/tophotelapartment_1.jpg",
        "/upload/homestays-photos/bongvilla_1.jpg",
        "/upload/homestays-photos/rolex_1.jpg",
        "/upload/homestays-photos/aritarivera_1.jpg",
        "/upload/homestays-photos/b245villavungtau_1.jpg",
        //Nhat
        "/upload/homestays-photos/The 1993 Hoi An.jpg",
        "/upload/homestays-photos/Hai Au Boutique.jpg",
        "/upload/homestays-photos/De An Hoi An.jpg",
        "/upload/homestays-photos/Mali Villa.jpg",
        "/upload/homestays-photos/Ancient River Villa.jpg",
        "/upload/homestays-photos/Dao Tien homestay.png",
        "/upload/homestays-photos/La Vista Villa Hoi An.jpg",
        "/upload/homestays-photos/ABA TRAVEL VILLA.png",
        "/upload/homestays-photos/Bespoke Villa.jpg",
        "/upload/homestays-photos/Double Luxury Room.jpg",
        "/upload/homestays-photos/Santori Homestay.jpg",
        "/upload/homestays-photos/Flame Flowers Homestay.jpg",
        "/upload/homestays-photos/YLANG GARDEN VILLA.jpg",
        "/upload/homestays-photos/Open Balcony.jpg",
        "/upload/homestays-photos/Hoi An Majestic villa.jpg"

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

    /** danh sách generalServices phải đúng thứ tự với danh sách homestays ở trên */
    let generalServicesName = [
        // Làm thêm 7 cái cho đủ 10 cái như này
        "Bể bơi",
        "Phòng karaoke",
        "Suối nước nóng"
    ]
    // Gán theo thứ tự các generalServices cho các homestay
    // Hiện tại đang seed dữ liệu kiểu 1 - 1 , sau sẽ chỉnh lại thành 1 - n sau
    for(let i = 0; i < generalServicesName.length; i++) {
        let generalServices = await GeneralServices(db).create({
            name: generalServicesName[i],
            homestays: homestays[i]._id,
        })
        // cập nhật _id của generalService vào homestays
        await Homestays(db).findByIdAndUpdate(homestays[i]._id,
            {$push: {generalServices: generalServices._id}})
    }

    /** danh sách services phải đúng thứ tự với danh sách homestays ở trên */
    let servicesName = [
        { // Làm 10 cái như này
            name: "Lẩu thái",
            pricePerUnit: 300000,
            personServe: 6
        }
    ]
    // Gán theo thứ tự các Services cho các homestay
    // Hiện tại đang seed dữ liệu kiểu 1 - 1 , sau sẽ chỉnh lại thành 1 - n sau
    for(let i = 0; i < servicesName.length; i++) {
        let services = await Services(db).create({
            name: servicesName[i].name,
            pricePerUnit: servicesName[i].pricePerUnit,
            personServe: servicesName[i].personServe,
            homestays: homestays[i]._id,
        })
        // cập nhật _id của generalService vào homestays
        await Homestays(db).findByIdAndUpdate(homestays[i]._id,
            {$push: {services: services._id}})
    }
    console.log('seeded homestays OK!');
    await db.close();
}
/*
HomestaysSeed().catch(error => {
    console.log(error)
});
*/