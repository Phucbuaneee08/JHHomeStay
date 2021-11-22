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
