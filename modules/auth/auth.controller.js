const AuthService  = require("./auth.service");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Xử lí đăng nhập
exports.login = async (req, res) => {
       try {
           // Gọi tới hàm kiểm tra trong cơ sở dữ liệu xem có đúng là người dùng
           const data = req.body;
           const loginUser = await AuthService.checkLogin(data);

           // Nếu kiểm tra OK -> res 200
           return res.status(200).json({
               success: true,
               message: ["login_success"],
               content: loginUser
           });
       } catch (error) {
           console.log('errorLogin', error);
           // Nếu ko thành công -> 401
           return res.status(401).json({
               success: false,
               message: Array.isArray(error) ? error : ["login_fail"],
               content: error
           });
       }
}


// Xử lí đăng xuất
exports.logout = async (req, res) => {
    try {
        // Gọi tới hàm xóa token và trả lại thông tin người dùng khi xóa token
        const data = req.body;
        const logout = await AuthService.checkLogout(data);

        // Nếu thành công -> res 200
        return res.status(200).json({
            success:true,
            message: ["logout_success"],
            content: logout
        });
    } catch (error) {
        console.log('errorLogOut', error);
        // Nếu ko thành công -> 401
        return res.status(401).json({
            success: false,
            message: Array.isArray(error) ? error : ['logout_fail'],
            content: error
        });
    }
}
