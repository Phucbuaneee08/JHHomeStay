const HomestaysService = require('./admin.homestays.service');

//Cập nhật thông tin homestay
exports.updateHomestay = async (req,res) => {
    try{
        //Lấy dữ liệu từ request
        const data = req.body;

        //Lấy thông tin các trường
        const homestayId = data._id ? data._id : null;
        const homestayName = data.name ? data.name : null;
        const homestayPrice = data.price ? data.price : null;
        const homestayType = data.type ? data.type : null;
        const homestayAddress = data.address ? data.address : null;
        const homestayProvince = data.province ? data.province : null;
        const homestayDistrict = data.district ? data.district : null;
        const homestayLatitude = data.latitude ? data.latitude : null;
        const homestayLongitude = data.longitude ? data.longitude : null;
        const homestayArea = data.area ? data.area : null;
        const homestayDescription = data.description ? data.description : null;
        const homestayAvailable = data.available ? data.available : null;
        const homestayAmenities = data.amenities ? data.amenities : null;
        const homestayServices = data.services ? data.services : null;
        const homestayGeneralServices = data.generalServices ? data.generalServices : null;
        const homestayPhotos = data.photos ? data.photos : null;

        // Update homestays và trả về thông báo thành công
        const homestays = await HomestaysService.updateHomestay(homestayId, homestayName, 
            homestayPrice, homestayType, homestayAddress, homestayProvince, homestayDistrict, 
            homestayLatitude, homestayLongitude, homestayArea, homestayDescription, 
            homestayAvailable, homestayAmenities, homestayServices, homestayGeneralServices, homestayPhotos)

        //Trả về thông báo thành công
        return res.status(200).json({
            success: true,
            message: "Update homestay success",
            content: homestays
    })

    }
    catch(Error){
        //Lỗi không xác định
        return res.status(401).json({
            success: false,
            message: "Exception",
            content: Error
    })}
    
}



