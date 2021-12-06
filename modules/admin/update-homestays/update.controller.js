const { Homestays } = require('../../../models');
const UpdateServices = require('./update.service');
const {db} = require("../../../helpers/dbHelper");

//Sửa thông tin homestay: name, price, type, adress, provice, district, description, available
/*************************************************************************************
 *                                                                                   *
 *  - Dữ liệu đầu vào là những trường muốn sửa đổi + _id của Bảng chứa các trường đó *     
 *                                                                                   *
 *  Luồng xử lý của updateHomestay:                                                  *
 *  + Trả về _id và các trường muốn sửa, trường nào để trống coi như không sửa       *
 *  + Hệ thống sẽ tự xử lý và cập nhật vào dataBase                                  *
 *  + Cập nhật thành công hệ thống sẽ thông báo thành công                           *
 *  + Chưa tìm được lỗi ngoại lệ                                                     *
 *                                                                                   *                               
 *************************************************************************************/

exports.updateInformationForHomestay = async (req,res)=>{
    try{
        //Dữ liệu homestays mới lấy từ request
        const data = req.body;
        var modifiedCount=0;
        //Update cho homestays 
        const modifiedCount1 = await UpdateServices.updateHomestaysById(data);
        //Update cho services
        var modifiedCount2 = 0;
        if(typeof(data.services) != "undefined" && data.services.length != 0){
            for(let i=0;i<data.services.length;i++){
            let count = await UpdateServices.updateServicesById(data.services[i]);   
            modifiedCount2 +=count;
            }
        }
        //Update cho generalServices
        var modifiedCount3 = 0;
        if(typeof(data.generalServices) != "undefined" && data.generalServices.length != 0){
            for(let i=0;i<data.generalServices.length;i++){
            let count = await UpdateServices.updateGeneralServicesById(data.generalServices[i]);   
            modifiedCount3 +=count;
            }
        }
        //Update cho Rooms
        var modifiedCount4 = 0;
        if(typeof(data.rooms) != "undefined" && data.rooms.length != 0){
            for(let i=0;i<data.rooms.length;i++){
            let count = await UpdateServices.updateRoomsById(data.rooms[i]);   
            modifiedCount4 +=count;
            }
        }
        //Update cho Signatures
        var modifiedCount5 = 0;
        if(typeof(data.signatures) != "undefined" && data.signatures.length != 0){
            for(let i=0;i<data.signatures.length;i++){
            let count = await UpdateServices.updateSignaturesById(data.signatures[i]);   
            modifiedCount5 +=count;
            }
        }
        //Update cho Amemities
        var modifiedCount6 = 0;
        if(typeof(data.amenities) != "undefined" && data.amenities.length != 0){
            for(let i=0;i<data.amenities.length;i++){
            let count = await UpdateServices.updateAmenitiesById(data.amenities[i]);   
            modifiedCount6 +=count;
            }
        }
        //Update cho Photos
        var modifiedCount7 = 0;
        if(typeof(data.photos) != "undefined" && data.photos.length != 0){
            for(let i=0;i<data.photos.length;i++){
            let count = await UpdateServices.updatePhotosById(data.photos[i]);   
            modifiedCount7 +=count;
            }
        }
        modifiedCount = modifiedCount1+modifiedCount2+modifiedCount3+modifiedCount4+modifiedCount5+modifiedCount6+modifiedCount7;
        return res.status(200).json({
            success: true,
            message: "Update success",
            content: "Số trường đã bị thay đổi: " + modifiedCount
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

exports.createInformationForHomestay = async (req,res)=>{
    try{
        //Lấy về dữ liệu trong body của request
        const data = req.body;
        if(typeof(data._id) == "undefined" || data._id == ""){
            return res.status(403).json({
                success: false,
                message: "Chưa có trường _id homestay hoặc chưa điền trường _id homestays",
                content: ""
        })   
        }
        //Create cho GeneralServices
        if(typeof(data.generalServices) != "undefined" && data.generalServices.length != 0){
            for(let i=0;i<data.generalServices.length;i++){
            await UpdateServices.createGeneralServicesById(data.generalServices[i],data._id);   
            }
        }
        //Create cho Services
        if(typeof(data.services) != "undefined" && data.services.length != 0){
            for(let i=0;i<data.services.length;i++){
            await UpdateServices.createServicesById(data.services[i],data._id);   
            }
        }
        //Create cho Rooms
        if(typeof(data.rooms) != "undefined" && data.rooms.length != 0){
            for(let i=0;i<data.rooms.length;i++){
            await UpdateServices.createRoomsById(data.rooms[i],data._id);   
            }
        }
        //Create cho Signatures
        if(typeof(data.signatures) != "undefined" && data.signatures.length != 0){
            for(let i=0;i<data.signatures.length;i++){
            await UpdateServices.createSignaturesById(data.signatures[i],data._id);   
            }
        }
        //Create cho Amenities
        if(typeof(data.amenities) != "undefined" && data.amenities.length != 0){
            for(let i=0;i<data.amenities.length;i++){
            await UpdateServices.createAmenitiesById(data.amenities[i]);   
            }
        }
        //Create cho Photos for homestays
        if(typeof(data.photos) != "undefined" && data.photos.length != 0){
            for(let i=0;i<data.photos.length;i++){
            await UpdateServices.createPhotosById(data.photos[i],data._id);   
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
        return res.status(404).json({
            success: false,
            message: "Exception",
            content: Error
    })   
    }
}
