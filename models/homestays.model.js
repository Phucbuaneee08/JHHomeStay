const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Bảng danh sách và các thông tin tổng quan của homestays
//Lưu ý bảng này có options timestamp nên khi truy vấn chú ý
const HomestaysSchema = new Schema(
    {
        name: { // Tên homestay
            type: String
        },
        price: { // Giá homestay
            type: Number
        },
        type: { // Loại homestay
            type: String
        },
        address: { // địa chỉ cụ thể của homestay
            type: String
        },
        province: { // Địa chỉ tỉnh
            type: String
        },
        district: { // Địa chỉ huyện
            type: String
        },
        latitude: { // Tọa độ: Vĩ độ
            type: String
        },
        longtitude: { //Tọa độ: Kinh độ
            type: String
        },
        area: { // Khu vực
            type: String
        },
        desription: { // Mô tả về homestay
            type: String
        },
        rate: { // Đánh giá, theo sao
            type: Number
        },
        available: { // Khả năng phục vụ, còn bao nhiêu phòng
            type: Boolean
        },
        cleanRate: { // Đánh giá mức độ sạch sẽ
            type: Number
        },
        serviceRate: { //Đánh giá dịch vụ
            type: Number
        },
        valueRate: { // Đánh giá giá trị
            type: Number
        },
        accurancyRate: { // Đánh giá sự chính xác, làm việc chuẩn của homestay
            type: Number
        },
        viewRate: { // Đánh giá phong cảnh, view nhìn tại homestay
            type: Number
        }
    }, {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

module.exports = (db) => {
    if(!db.models.Homestays)
        return db.model('Homestays', HomestaysSchema);
    return db.models.Homestays;
}