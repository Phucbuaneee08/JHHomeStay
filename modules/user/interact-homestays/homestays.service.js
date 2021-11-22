const {Homestays} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
exports.getRankingHomestays = async (quantity) => {
    console.log(quantity);
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
            $limit: Number(quantity)
        }
    ]);
    console.log(homestays);
    return homestays;
}

exports.createRating = async (id, rate) => {
    const homestay = await Homestays(db).findByIdAndUpdate(id, {
        $push: {rates: rate}
    }, {new: true})
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

