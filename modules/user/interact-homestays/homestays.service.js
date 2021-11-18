const {Homestays} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
exports.getRankingHomestays = async (quantity) => {
    const homestays = await Homestays(db).aggregate([
        {
            $set: {
                totalRate: {$sum: {
                    $sum: ["$rates.cleanRate", "$rates.serviceRate", "$rates.valueRate", "$rates.accuracyRate"]
                    }
                }
            }
        },
        {
            $sort: { totalRate: -1}
        },
        {
            $limit: quantity
        }
    ]);
    return homestays;
}

exports.createRating = async (id, rate) => {
    const homestay = await Homestays(db).findByIdAndUpdate(id, {
        $push: {rate: rate}
    })
    return homestay;
}

exports.create = async(data) => {
    //code here
}

exports.edit = async(id, data) => {
    //code here}
}

exports.delete = async(id) => {
    //code here
}

