/**
 * ****************************************
 * Middleware xác thực truy cập người dùng
 * 1.Kiểm tra người dùng đã xác thực
 * 2.Kiểm tra xem JWT của người dùng có hợp lệ hay không?
 * 3.Kiểm tra xem người dùng có role hợp lệ hay không?
 * ****************************************
 */
const jwt = require('jsonwebtoken');
const { Users } = require('../models/index');
const path = require('path');
const {db} = require("../helpers/dbHelper");

// Chuyển file .env sang dạng có thể sử dụng được
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

//Kiểm tra token của request
exports.authToken = async function ( req, res, next ) {
    const access_token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : '';

    //Nếu token ko tồn tại -> lỗi
    if (!access_token) {
        return res.status(401).json({
            success: false,
            message: "invalid access token"
        });
    }

    //Giải mã token, sử dụng jwt
    let decodedToken;
    try {
        decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "invalid access token",
            content: err
        });
    }

    //Nếu token sau giải mã underfined -> Trả lại res lỗi
    if ( decodedToken === undefined) {
        return res.status(401).json({
            success: false,
            message: "invalid access token"
        });
    } else {
        try {
            //Kiểm tra người sử dụng -> Kết nối kiểm tra ở database
            req.user = await Users(db).findOne({
                email: decodedToken.email,
                role: decodedToken.role,
            });
            next();
        } catch (err) {
            next(err);
        }
    }
}

// Xác thực có phải là super admin ko
exports.authRole = async function ( req, res, next) {
    if (!res.user) {
        try{
            //Truy vấn database để kiểm tra
            let user = await Users(db).findOne({
                email: req.body.email,
                role: req.body.role,
            });

            //Nếu ko tồn tại, ko phải super admin hoặc admin
            if ( !user || user.status !== 1 ) {
                if ( user.role == 'admin' || user.role == 'super_admin' ) {}
                else {
                    return res.status(401).json({
                        success: false,
                        message: "invalid credential ",
                    });
                }
            } else{
                next();
            }
        } catch (err) {
            next(err);
        }
    } else {
        if ( req.user.status !== 1 ) {
            if ( req.user.role == 'admin' || req.user.role == 'super_admin') {}
            else {
                return res.status(401).json({
                    success: false,
                    message: " invalid credential "
                });
            }
        } else next();
    }
}
