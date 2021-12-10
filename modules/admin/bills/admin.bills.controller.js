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
        // Nếu ko thành công -> 401
        return res.status(401).json({
            success: false,
            message: Array.isArray(error) ? error : "Admin's id is not correct!",
            content: error
        });
    }
}

exports.deleteBillsById = async ( req, res) =>{
    try{
        //Lấy dữ liệu từ phần thân của req
        const data = req.body;

        //Lấy id của bills
        const Bill_Id = data._id;

        //Kiểm trả xem bill có tồn tại không bằng Id
        const Bills = await BillsService.findBillsById( Bill_Id );

        if( typeof( Bills ) == "undefined" || Bills === null ){
            return res.status(403).json({
                success: false,
                message: "Bills is not exist",
                content: ""
            })
        }

        //Xóa bills ra khỏi danh sách bills
        await BillsService.deleteBillsById( Bill_Id );

        //Nếu thành công gửi về thông báo thành công
        return res.status(200).json({
            success: true,
            message: "Delete bill success",
            content: ""
        });

    } catch ( Error ) {
        // Nếu ko thành công -> 401
        return res.status(401).json({
            success: false,
            message: "Exception",
            content: Error
        });
    }
}