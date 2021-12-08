const { Homestays,Bills } = require('../../../models');
const {db} = require("../../../helpers/dbHelper");

exports.createBills = async (req,res)=>{
    try{
    //Lấy dữ liệu từ body
    const data = req.body;

    // //Tạp bills với các trường đơn, bắt buộc phải điền hết các trường đơn
    // await BillsService.createBill( data );

    await Bills(db).findById({ _id:"61b0eeb1fa8099a5f2c942d8"})
    .populate({
        path : 'servicesPerBill',
        populate : { path : 'services' }
    })
    .then(data=>{
        console.log( data.servicesPerBill );
    })

    // //Cập nhật price cho bills
    // await BillsService.updatePrice( data );

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