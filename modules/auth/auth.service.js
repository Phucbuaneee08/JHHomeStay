const { Users } = require('../../models');
const { dbConnect } = require("../../helpers/dbHelper");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Lấy thông tin người dùng có email và role giống như trong req
exports.getByEmailAndRole = async (data) => {
    let user = await Users(dbConnect()).findOne({
        email: data.email,
        role: data.role,
    });
    return user;
}

// Thêm trường thông tin token cho user
exports.editUser = async (data) => {
    let user = await Users(dbConnect()).updateOne(
        {
            email: data.email,
            role: data.role
        }, { token: data.token });
    return user;
}

// Xóa trường thông tin token khi người dùng log out
exports.deleteToken = async (data) => {
    let user = await Users(dbConnect()).updateOne(
        {
            email: data.email,
            role: data.role
        }, { token: null });
    return user;
}