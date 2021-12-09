const { Homestays,Bills } = require('../../../models');
const {db} = require("../../../helpers/dbHelper");
const BillsService = require('./user.bills.service');

exports.createBills = async (req,res)=>{
    try{
        //Lấy dữ liệu từ body
        const data = req.body;
 
        //Tạp bills với các trường đơn, bắt buộc phải điền hết các trường đơn
        const _id = await BillsService.createBill( data );

        //Cập nhật price cho bills
        await BillsService.updatePrice( _id );

        res.status(200).json({
            success:true,
            message:"Create Success",
            content: ""
        })
    }

    catch(Error){
        res.status(404).json({
            success:false,
            message:"Exception",
            content: Error
        })
    }
}