const BillsService = require('./admin.bills.service');

//API trả về danh sách các bills theo admin (gửi về bills của các homestays mà admin X có)
exports.getBillsByAdminId = async (req, res) => {
    try {
        // Lấy id ở params
        const id = req.params.id;
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let bills = await BillsService.getBillsByAdminId(id);
        // Nếu thành công trả lại res 200 và danh sách các bills
        return res.status(200).json({
            success: true,
            content: bills
        });
    } catch (error) {
        // Nếu ko thành công -> 404
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "Admin's id is not correct!",
            content: error
        });
    }
}


exports.getBillsByHomestayId = async (req, res) => {
    try {
        // Lấy id ở params
        const id = req.params.id;
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let bills = await BillsService.getBillsByHomestayId(id);
        // Nếu thành công trả lại res 200 và danh sách các bills
        return res.status(200).json({
            success: true,
            content: bills
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
