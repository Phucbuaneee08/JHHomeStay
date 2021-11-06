const { Users } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { dbConnect } = require("../../helpers/dbHelper");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Hàm kiểm tra xem người dùng có nằm trong cơ sở dữ liệu ko --> Tạo cho 1 token
exports.checkLogin = async (data) => {
    const { email, password, role } = data;

    // Tìm kiếm trong database
    let loadedUser = await Users(dbConnect()).findOne({
        email: email,
        role: role,
    });
    let access_token;

    //Kiểm tra mật khẩu -> Dùng bcrypt
    if ( loadedUser.status === 1 ) {
        if (await bcrypt.compare(password, loadedUser.password)) {

            //Tạo token cho người mới đăng nhập
            access_token = jwt.sign({
                email: loadedUser.email,
                role: loadedUser.role,
            }, process.env.TOKEN_SECRET, {expiresIn: 60 * 15});
            loadedUser.token = access_token;

            await Users(dbConnect()).create(loadedUser);
        }
    }
    return {
       token: access_token,
       user: {
           email: loadedUser.email,
           role: loadedUser.role
       }
    };
}

// Xóa token khi người dùng đăng xuất
exports.checkLogout = async (data) => {

    //Xóa token
    await Users(dbConnect()).updateOne(
        {
            email: data.email,
            role: data.role,
            token: null
        });

    //Lấy ra thông tin người dùng sau khi xóa token để sau debug cho dễ
    let user = await Users(dbConnect()).findOne({
        email: data.email,
        role: data.role,
    });
    return user;
}