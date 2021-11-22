const HomestaysService = require("./homestays.service");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();

// Lấy dữ liệu chi tiết về 1 homestay
// API này chưa test hết các trường hợp lỗi trả về
exports.getHomestayById = async (req, res) => {
    try {
        // Lấy id ở params
        const id = req.params.id;
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let homestay = await HomestaysService.getHomestayById(id);
        // Nếu thành công trả lại res 200 và toàn bộ thông tin homestay
        return res.status(200).json({
            success: true,
            content: homestay
        });
    } catch (error) {
        // Nếu ko thành công -> 404
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "Homestay's id is not correct!",
            content: error
        });
    }
}