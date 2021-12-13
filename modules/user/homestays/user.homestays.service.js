const {Homestays, Amenities, GeneralServices, Bills} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {compare} = require("bcrypt");
const {Users} = require("../../../models");
const {ObjectId} = require('mongodb');
const {toInt} = require("validator");
const qty = 16;                             // Số lượng homestays mỗi slice

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
        .populate('services',"name");
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

    let homestaysArray =  homestaysDocs.filter(homestay => ((!homestay.averageRates) || (homestay.averageRates> averageRates)));
    let sliceTotal = Math.floor(homestaysArray.length / 16) + 1;

    return {homestays: homestaysArray.slice([slice * qty, slice * qty + qty]), sliceTotal : sliceTotal};
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
