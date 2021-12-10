const {Homestays, Bills, Users} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const mongoose  = require('mongoose');
const {ObjectId} = require('mongodb');
const {compare} = require("bcrypt");

//API trả về danh sách các bills theo admin (gửi về bills của các homestays mà admin X có)
exports.getBillsByAdminId = async (id) => {
    // Trả lại danh sách các bill, nhóm các bill theo từng homestay để dễ quản lý bill

    /* Luồng xử lí ở trên là tìm trong bảng Homestay ra các homestay có giá trị trường admin bằng id như yêu cầu,
    *  Sau đó join với bảng bills
    *  và với mỗi homestay mà admin đó quản lý thì chỉ lấy ra trường tên homestay và trường bill
    *  để trả lại cho client*/
    const bills = await Homestays(db).aggregate([
        {
            $match: {
                admin: ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "bills",
                localField: "bills",
                foreignField: "_id",
                as: "bills"
            }
        },
        {
            $project: {
                "_id":1,"name":1,"bills":1
            }
        }
    ])
    return bills;
}

//API trả về danh sách các bills theo homestay
exports.getBillsByHomestayId = async (id) => {
    // Trả lại danh sách các bill theo homestay
    const bills = await Homestays(db).aggregate([
        {
            $match: {
                _id: ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "bills",
                localField: "bills",
                foreignField: "_id",
                as: "bills"
            }
        },
        {
            $project: {
                "_id":1,"name":1,"bills":1
            }
        }
    ])
    return bills;
}

