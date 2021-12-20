const HomestayService = require('./super-admin.homestays.service');

//Tạo Homestays
exports.createInformationForHomestay = async (req, res) => {
    try{
        //Lấy về dữ liệu trong body của request
        const data = req.body;

        const adminId = data.adminId ? data.adminId : null;
        const homestayName = data.name ? data.name : " ";
        const homestayType = data.type ? data.type : " ";
        const homestayProvince = data.province ? data.province : " ";
        const homestayDistrict = data.district ? data.district : " ";
        const homestayAddress = data.address ? data.address : " ";
        const homestayPrice = data.price ? data.price : 0;

        if( !adminId ) {
            return res.status(404).json({
                success: false,
                message: "Create homestay fail",
                content: "Chưa điền id admin"
            })  
        } 

        //Tạo homestay 
        const homestay = await HomestayService.createHomestay(adminId, homestayName, homestayProvince, homestayDistrict, homestayAddress, homestayType, homestayPrice );

        return res.status(200).json({
            success: true,
            message: "Create homestay successful",
            content: ""
        })

    }
    catch(Error){
        //Lỗi không xác định
        return res.status(404).json({
            success: false,
            message: "Create homestay fail",
            content: Error
    })   
    }
}

