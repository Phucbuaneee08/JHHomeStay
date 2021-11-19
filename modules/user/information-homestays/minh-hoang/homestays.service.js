const { Homestays } = require('../../../../models');
const { db } = require("../../../../helpers/dbHelper");

// Chuyển file .env sang dạng sử dụng được để lấy thông tin
require('dotenv').config();
// Truy xuất cơ sở dữ liệu để tìm homestay với id cho trước
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