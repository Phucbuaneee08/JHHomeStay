const {Homestays, Amenities, GeneralServices, Bills, Photos} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {compare} = require("bcrypt");
const {Users} = require("../../../models");
const {ObjectId} = require('mongodb');
const {toInt} = require("validator");
const qty = 20;                             // Số lượng homestays mỗi slice

exports.getRankingHomestays = async (quantity) => {
    const homestays = await Homestays(db).aggregate([
        {
            $unwind: {
                path: "$rates",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                homestays: { $first: "$$ROOT" },
                rates: { $push:
                        {
                            "_id": "$rates._id",
                            "cleanRate": "$rates.cleanRate",
                            "serviceRate": "$rates.serviceRate",
                            "valueRate": "$rates.valueRate",
                            "accuracyRate": "$rates.accuracyRate",
                            "description": "$rates.description",
                            "userName": "$rates.userName",
                            "createdAt": "$rates.createdAt",
                        }},
                countRates: {$sum: 1},
                totalRates: {
                    $sum: {
                        $sum: ["$rates.cleanRate", "$rates.serviceRate", "$rates.valueRate", "$rates.accuracyRate"]
                    }
                }
            }
        },
        {
            $replaceRoot: { "newRoot": { "$mergeObjects": ["$homestays", { totalRates: "$totalRates" }, { countRates: "$countRates"}, {rates: "$rates"}]} }
        },
        {
            $set: {
                averageRates: {$divide: ["$totalRates", {$multiply: ["$countRates", 4]}]}
            }
        },
        {
            $sort: {"averageRates" : -1}
        },
        {
            $limit: Number(quantity)
        },
        {
            $lookup: {
                from: "photos",
                localField: "photos",
                foreignField: "_id",
                as: "photos"
            }
        }
    ]);
    return homestays;
}

exports.createRating = async (id, rate) => {
    const homestay = await Homestays(db).findByIdAndUpdate(id, {
        $push: {rates: rate}
    }, {new: true})
    return homestay;
}

exports.getHomestayById = async (id) => {
    const homestay = await Homestays(db).findById(id)
        .populate('amenities',"name")
        .populate('generalServices', "name")
        .populate('photos', "url")
        .populate('services',"name pricePerUnit personServe");
    return homestay;
}

exports.getHomestayByFilter = async(province, type, averageRates, minPrice, maxPrice, generalServices, amenities, slice) =>  {

    //Chuẩn bị Filter để lọc dữ liệu
    let keyFilter = {};
    if (province) {
        keyFilter = { ...keyFilter, province: {$regex: province},}
    }
    if (type) {
        keyFilter = { ...keyFilter, type: {$regex: type},}
    }
    if (generalServices) {
        let data = [];
        if (typeof (generalServices) === 'string') {
            data.push(...(await GeneralServices(db).find({name: generalServices})));
        } else {
            for (let i = 0; i < generalServices.length; i++) {
                data.push((await GeneralServices(db).findOne({name: generalServices[i]})));
            }
        }
        data = data.map(a => a._id);
        keyFilter = { ...keyFilter, generalServices:  {$all: data}}
    }
    if (amenities) {
        keyFilter = { ...keyFilter, amenities: {$all: amenities}}
    }
    if (minPrice) {
        if (maxPrice){
            keyFilter = {...keyFilter, price: {$gte: minPrice, $lte: maxPrice}}
        }
        else {
            keyFilter = { ...keyFilter, price: {$gte:minPrice}}
        }
    }
    else {
        if (maxPrice) {
            keyFilter = {...keyFilter, price: {$lte: maxPrice}}
        }
    }
    //Lọc theo filter và trả về số lượng homestays là 16, theo đúng số homestays mỗi trang cho FE
    let homestaysDocs =  (await Homestays(db).find(keyFilter).sort({'price': 'desc'})
        .populate('amenities',"name")
        .populate('generalServices', "name")
        .populate('photos', "url")
        .populate('services',"name"));

    console.log(slice);
    console.log(slice*qty, slice*qty+ qty);
    let homestaysArray =  homestaysDocs.filter(homestay => ((!homestay.averageRates) || (homestay.averageRates> averageRates)));
    let sliceTotal = Math.floor(homestaysArray.length / qty) + 1;

    return {homestays: homestaysArray.slice(slice*qty, slice*qty+ qty), sliceTotal : sliceTotal};
}

// Trả về khoảng thời gian homestay đã được đặt dựa vào homestay 's id , nếu chưa được đặt trả về null
exports.getCheckInAndOutDateByIdHomestay = async (id) => {
    let bill = await Bills(db).aggregate([
        {
            $match: {
                homestay: ObjectId(id),
                status: parseInt("2")
            }
        },
        {
            $project: {
                "checkinDate":1, "checkoutDate":1
            }
        }
    ]);
    return bill;
}

//Update Homestays Service
exports.updateHomestay = async (homestayId, homestayName, homestayPrice, homestayType, homestayAddress,homestayProvince, homestayDistrict, homestayLatitude, homestayLongitude, homestayArea, homestayDescription, homestayAvailable, homestayAmenities, homestayServices, homestayGeneralServices, homestayPhotos) =>{
    // Tạo object rỗng để chứa các thông tin cần cập nhật
    let setHomestay = {};

    // Kiểm tra và cập nhật
    if( homestayName ){
        setHomestay = {...setHomestay, "name": homestayName};
    }

    if( homestayPrice ){
        setHomestay = {...setHomestay, "price": homestayPrice};
    }

    if( homestayType ){
        setHomestay = {...setHomestay, "type": homestayType};
    }

    if( homestayAddress ){
        setHomestay = {...setHomestay, "address": homestayAddress};
    }

    if( homestayProvince ){
        setHomestay = {...setHomestay, "province": homestayProvince};
    }

    if( homestayDistrict ){
        setHomestay = {...setHomestay, "district": homestayDistrict};
    }

    if( homestayLatitude ){
        setHomestay = {...setHomestay, "latitude": homestayLatitude};
    }

    if( homestayLongitude ){
        setHomestay = {...setHomestay, "longitude": homestayLongitude};
    }

    if( homestayArea ){
        setHomestay = {...setHomestay, "area": homestayArea};
    }

    if( homestayDescription ){
        setHomestay = {...setHomestay, "description": homestayDescription};
    }

    if( homestayAvailable ){
        setHomestay = {...setHomestay, "available": homestayAvailable};
    }

    if( homestayServices ){
        setHomestay = {...setHomestay, "services": homestayServices};
    }

    // Cập nhật vào database
    const homestay = await Homestays(db).updateOne(
        {_id: homestayId},
        {$set: setHomestay}
    );

    if (homestayPhotos) {
        await Homestays(db).findByIdAndUpdate(homestay._id, {
            $set: {amenities: []}
        })
        for (let i = 0; i < homestayPhotos.length; i++) {
            const photo =  await Photos(db).create({
                url: homestayPhotos[i]
            });
            await Homestays(db).findByIdAndUpdate(homestay._id, {
                $push: {photos: photo._id}
            })
        }
    }

    if (homestayAmenities) {
        await Homestays(db).findByIdAndUpdate(homestay._id, {
            $set: {amenities: []}
        })
        for (let i = 0; i < homestayAmenities.length; i++) {
            const amenity =  await Amenities(db).create(homestayAmenities[i]);
            await Homestays(db).findByIdAndUpdate(homestay._id, {
                $push: {amenities: amenity._id}
            })
        }
    }

    if (homestayGeneralServices) {
        await Homestays(db).findByIdAndUpdate(homestay._id, {
            $set: {generalServices: []}
        })
        for (let i = 0; i < homestayGeneralServices.length; i++) {
            const generalService =  await GeneralServices(db).create(homestayGeneralServices[i]);
            await Homestays(db).findByIdAndUpdate(homestay._id, {
                $push: {generalServices: generalService._id}
            })
        }
    }
    return (await Homestays(db).findById(homestay._id)
        .populate('amenities',"name")
        .populate('generalServices', "name")
        .populate('photos', "url")
        .populate('services',"name pricePerUnit personServe"));
}

