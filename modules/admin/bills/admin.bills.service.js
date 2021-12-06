const {Homestays, Bills, Users} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {compare} = require("bcrypt");

//API trả về danh sách các bills theo admin (gửi về bills của các homestays mà admin X có)
exports.getBillsByAdminId = async (id) => {
    // Trả lại danh sách các bill, nhóm các bill theo từng homestay để dễ quản lý bill

    /* Luồng xử lí ở trên là tìm trong bảng Homestay ra các homestay có giá trị trường admin bằng id như yêu cầu,
    *  Sau đó với mỗi homestay mà admin đó quản lý thì chỉ lấy ra trường tên homestay và trường bill
    *  để trả lại cho client, vì trường bill lúc này là mảng các ObjectId nên phải populate
    *  để thay thế các id đó bằng thông tin cụ thể của bills
    */
    return Homestays(db).find(
        {
            admin: id
        }, {
            name: 1,
            bills: 1
        }
    ).populate('bills');
}