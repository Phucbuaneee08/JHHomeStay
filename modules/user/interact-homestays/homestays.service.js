const {Homestays} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
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
    /*Tìm homestay có id như yêu cầu trong Bảng Homestay
    -> Sau đó dùng Populate để chuyển hết các thuộc tính dạng ObjectId (đã kết nối lúc seed)
    sang thành đối tượng tương ứng trong cơ sở dữ liệu
    */
    return Homestays(db).findById(id)
        .populate('services')
        .populate('generalServices')
        .populate('photos');
}
