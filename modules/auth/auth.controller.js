const { Users } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { body, validationResult} = require('express-validator');
const { dbConnect } = require("../../helpers/dbHelper");

//Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

//Xử lí đăng nhập
exports.login = [
    // Khi check api bằng postman thì sẽ lưu thông tin ở body để dễ test
    body('email'),
    body('password').trim().exists().withMessage('required password'),
    body('role').isIn(['admin', 'super_admin']).withMessage('invalid role'),

    //Truy vấn cơ sở dữ liệu để xác thực
    async function (req, res, next) {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           res.status(400).json(errors.array());
           return;
       }
       try {
           const { email, password, role } = req.body;
           let loadedUser = await Users(dbConnect).findOne({
               email: email,
               role: role,
           });
           console.log(loadedUser);

           //Sử dụng bcrypt để so sánh mật khẩu ở database và của người dùng gửi
           if ( loadedUser.status === 1 ) {
               console.log(await bcrypt.compare(password, loadedUser.password), password)
               if (await bcrypt.compare(password, loadedUser.password)) {
                   const access_token = jwt.sign({
                       email: loadedUser.email,
                       role: loadedUser.role,
                   }    , process.env.TOKEN_SECRET, {expiresIn: 60 * 15});
                   loadedUser.token = access_token;

                   await Users(dbConnect).create(loadedUser);

                   return res.status(200).json({
                       access_token: access_token,
                   });
               }
               return res.status(401).json({
                   message: "invalid credential",
               });
           } else {
               return res.status(401).json({
                   message: "invalid credential",
               });
           }
       } catch (err) {
           next(err);
       }
    }
]

//Xử lí đăng xuất
exports.logout = async function (req, res, next) {
    try {
        let loadedUser = await Users(dbConnect).updateOne(
            {
                email: req.body.email,
                role: req.body.role,
            });

        return res.status(200).json({
            user: loadedUser,
        });
    } catch (err) {
        return res.status(500).json('Unexpected error!');
    }
}
