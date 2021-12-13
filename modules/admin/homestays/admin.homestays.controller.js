const { Homestays } = require('../../../models');
const HomestaysService = require('./admin.homestays.service');
const {db} = require("../../../helpers/dbHelper");

//Cập nhật thông tin homestay
exports.updateInformationForHomestay = async (req,res) => {
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
        return res.status(404).json({
            success: false,
            message: "Exception",
            content: Error
    })}
    
}


//Tạo thông tin các bảng cho Homestays
/*********************************************************************************************
 *                                                                                           *
 * - Dữ liệu đầu vào là _id homestay và _id của trường liên kết với bảng cần tạo(Bắt buộc)   *
 * - Luồng xử lý của CreateHomestays                                                         *
 *      + Nếu trả về đúng và đủ thì sao tự tạo như bình thường                               *
 *      + Chưa tìm thấy lỗi ngoại lệ                                                         *
 *                                                                                           *
 *********************************************************************************************/

exports.createInformationForHomestay = async (req,res) => {
    try{
        //Lấy về dữ liệu trong body của request
        constdata= req.body;
        if(typeof(data._id) == "undefined" || data._id === ""){
            return res.status(403).json({
                success: false,
                message: "Chưa có trường _id homestay hoặc chưa điền trường _id homestays",
                content: ""
        })   
        }
        //Create cho GeneralServices
        if(typeof(data.generalServices) !== "undefined" && data.generalServices.length !== 0){
            for(let i=0;i<data.generalServices.length;i++){
            await HomestaysService.createGeneralServicesById(data.generalServices[i],data._id);   
            }
        }
        //Create cho Services
        if(typeof(data.services) !== "undefined" && data.services.length !== 0){
            for(let i=0;i<data.services.length;i++){
            await HomestaysService.createServicesById(data.services[i],data._id);   
            }
        }
        //Create cho Rooms
        if(typeof(data.rooms) !== "undefined" && data.rooms.length !== 0){
            for(let i=0;i<data.rooms.length;i++){
            await HomestaysService.createRoomsById(data.rooms[i],data._id);   
            }
        }
        //Create cho Signatures
        if(typeof(data.signatures) !== "undefined" && data.signatures.length !== 0){
            for(let i=0;i<data.signatures.length;i++){
            await HomestaysService.createSignaturesById(data.signatures[i],data._id);   
            }
        }
        //Create cho Amenities
        if(typeof(data.amenities) !== "undefined" && data.amenities.length !== 0){
            for(let i=0;i<data.amenities.length;i++){
            await HomestaysService.createAmenitiesById(data.amenities[i]);   
            }
        }
        //Create cho Photos for homestays
        if(typeof(data.photos) !== "undefined" && data.photos.length !== 0){
            for(let i=0;i<data.photos.length;i++){
            await HomestaysService.createPhotosById(data.photos[i],data._id);   
            }
        }
        return res.status(200).json({
            success: true,
            message: "Create success",
            content: ""
    })

    }
    catch(Error){
        //Lỗi không xác định
        return res.status(401).json({
            success: false,
            message: "Exception",
            content: Error
    })   
    }
}
