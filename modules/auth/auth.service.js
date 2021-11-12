const { Users } = require('../../models');
const { db } = require("../../helpers/dbHelper");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Lấy thông tin người dùng có email và role giống như trong req
exports.getByEmailAndRole = async (data) => {
    return Users(db).findOne({
        email: data.email,
        role: data.role,
    });
}

// Lấy thông tin người dùng có _id giống như trong req
exports.getById = async (data) => {
    return Users(db).findOne({
        _id: data._id
    });
}

// Thêm trường thông tin token cho user
exports.editUser = async (data) => {
    return Users(db).updateOne(
        {
            email: data.email,
            role: data.role
        }, {token: data.token});
}

// Xóa trường thông tin token khi người dùng log out
exports.deleteToken = async (data) => {
    return Users(db).updateOne(
        {
            _id: data._id
        }, {token: null});
}