const { Homestays } = require('../../../models');
const UpdateServices = require('./update.service');
const {db} = require("../../../helpers/dbHelper");

//Sửa thông tin homestay: name, price, type, adress, provice, district, description, available
/**********************************************************************************
 *                                                                                *
 * - Dữ liệu đầu vào là _id của 1 bản ghi cần sửa                                 *
 *   và tất cả các trường đơn của dữ liệu đó                                      *
 *                                                                                *
 *  Luồng xử lý của updateHomestay:                                               *
 *   - req phải trả về đúng _id, nếu trả về _id sai                               *
 *     hoặc độ dài _id không đúng thì sẽ không sửa được thông tin                 *
 *   - nếu _id req trả về đúng tiêu chuẩn nhưng các trường đều trả về null hết    *
 *     thì res sẽ trả về không tìm thấy thông tin do _id không tồn tại            *  
 *   - Ngoài trường _id thì tương ứng với bảng nào cần sửa thông tin,             *
 *     req cần trả về thêm đúng các trường đơn của bảng đó                        *
 *   - Khi update cần trả về tất cả thông tin của các trường ĐƠN trong bảng       *
 *     + Nếu thiếu thông tin coi như trường đó bị trống                           *
 *                                                                                *
 **********************************************************************************/

exports.updateHomestay = async (req,res)=>{
    try{
        //Dữ liệu homestays mới lấy từ request
        const data = req.body;
        //Kiểm tra xem _id của homestays hay rooms, services, generalServices, signatures 
        const homestays = await UpdateServices.getHomestaysById(data._id);
        const rooms = await UpdateServices.getRoomById(data._id);
        const services = await UpdateServices.getServiceById(data._id);
        const generalServices = await UpdateServices.getGeneralServiceById(data._id);
        const signatures =await UpdateServices.getSignatureById(data._id);
        
        const amenities = await UpdateServices.getAmenityById(data._id);
        //Nếu nhập _id không đúng tiêu chuẩn thì cả 5 trường trên đều trả về rỗng và chỉ cần kiểm tra 1 trường
        // vì độ dài chuỗi _id khi tạo ra luôn bằng nhau ở tất cả các bản ghi 
        if(homestays == ""){
            return res.status(404).json({
                success: false,
                message: "Can not found, _id is not correct",
                content:""
        })
        }
        else{
            //Nếu là _id của homestays thì update homestays
            if(homestays != null){
                //Trả về số bản ghi bị thay đổi
            const modifiedCount = await UpdateServices.updateHomestay(data,homestays);
                return res.status(200).json({
                    success: true,
                    message: "update success for homestays",
                    content: "số trường đã sửa đổi: "+ modifiedCount
                })
            }
            if(rooms != null){
                //Trả về số bản ghi bị thay đổi
                const modifiedCount = await UpdateServices.updateRoomOfHomestay(data,rooms);
                return res.status(200).json({
                    success: true,
                    message: "update success for room",
                    content: "số trường đã sửa đổi: "+ modifiedCount
                })
            }
            if(services != null){
                //Trả về số bản ghi bị thay đổi
                const modifiedCount = await UpdateServices.updateServiceOfHomestay(data,services);
                return res.status(200).json({
                    success: true,
                    message: "update success for service",
                    content: "số trường đã sửa đổi: "+ modifiedCount
                })
            }
            if(generalServices !=null){
                //Trả về số bản ghi bị thay đổi
                const modifiedCount = await UpdateServices.updateGeneralServiceOfHomestay(data,generalServices);
                return res.status(200).json({
                    success: true,
                    message: "update success for generalService",
                    content: "số trường đã sửa đổi: "+ modifiedCount
                }) 
            }
            if(signatures != null){
                //Trả về số bản ghi bị thay đổi
                const modifiedCount = await UpdateServices.updateSignatureOfHomestay(data,signatures);
                return res.status(200).json({
                    success: true,
                    message: "update success for signature",
                    content: "số trường đã sửa đổi: "+ modifiedCount
                })
            }
            if(amenities != null){
                 //Trả về số bản ghi bị thay đổi
                 const modifiedCount = await UpdateServices.updateAmenityOfHomestay(data,signatures);
                 return res.status(200).json({
                     success: true,
                     message: "update success for signature",
                     content: "số trường đã sửa đổi: "+ modifiedCount
                 })

            }
        }

        //Nếu _id đúng tiêu chuẩn nhưng lại không tồn tại ở bản ghi nào
        return res.status(403).json({
            success: false,
            message: "update fail, _id is not exist",
            content: ""
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

//Xóa thông tin trong homestays
/*****************************************************************************************
 *                                                                                       *
 * - Xóa hẳn 1 bản ghi trong Homestays gồm:                                              *
 * + Thông tin phòng, thông tin service                                                  *
 * + Thông tin generalService, thông tin signatures                                      * 
 * - Dữ liệu đầu vào là _id của 1 bản ghi cầm xóa                                        *                                                                                   
 * - Luồng xử lý sẽ như sau:                                                             * 
 *      + Ban đầu truyền vào _id của 1 bản ghi:                                          *
 *          - Thất bại là khi _id đó không đúng tiêu chuẩn, _id đó đúng tiêu chuẩn       *
 *            nhưng không tồn tại ở bản ghi nào                                          *
 *          - Nếu thành công thì xóa bản ghi đó và trả về res thành công                 *
 *                                                                                       *
 *****************************************************************************************/
exports.deleteInformationInHomestay = async (req,res)=>{
    try{
    //Dữ liệu homestays mới lấy từ request
    const data = req.body;
   
    //Kiểm tra xem _id của homestays hay rooms, services, generalServices, signatures 
    const rooms = await UpdateServices.getRoomById(data._id);
    const services = await UpdateServices.getServiceById(data._id);
    const generalServices = await UpdateServices.getGeneralServiceById(data._id);
    const signatures =await UpdateServices.getSignatureById(data._id);
    const amenities = await UpdateServices.getAmenityById(data._id);
    if(rooms == ""){
        return res.status(402).json({
            success: false,
            message: "Can not found, _id is not correct",
            content: ""
    })
    }
    else{
        if(rooms != null){
        const deleteRoom = await UpdateServices.deleteRoomOfHomestay(rooms);
           return res.status(200).json({
               success: true,
               message: "delete success for room",
               content: ""
           })
            
        }
        if(services != null){

        const deleteService = await UpdateServices.deleteServiceOfHomestay(services);
           return res.status(200).json({
               success: true,
               message: "delete success for services",
               content: ""
           })
            
        }
        if(generalServices !=null){
            
        const deleteGeneralService = await UpdateServices.deleteGeneralServiceOfHomestay(generalServices);
           return res.status(200).json({
               success: true,
               message: "delete success for services",
               content: ""
           })
            
            
        }
        if(signatures != null){
           
        const deleteSignature = await UpdateServices.deleteSignatureOfHomestay(signatures);
           return res.status(200).json({
               success: true,
               message: "delete success for services",
               content: ""
           })
        
        }
        if(amenities !=null){
            const deleteAmenity = await UpdateServices.deleteAmenityOfRoom(amenities);
            return res.status(200).json({
                success: true,
                message: "delete success for amenities",
                content: ""
            })
        }
    }
    // Nếu mà không tìm thấy _id tất cả các trường đều bằng null
    return res.status(403).json({
        success: false,
        message: "delete fail, _id is not exist",
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

//Tạo thông tin các bảng cho Homestays
/*********************************************************************************************
 *                                                                                           *
 * - Dữ liệu đầu vào là _id homestay, typeData và các trường đơn của Data đó                 *
 *      + Nếu không trả về đúng typeData thì sẽ có thông báo lỗi                             *
 *      + typeData gồm "Services", "GeneralServices", "Signatures", "Rooms", "Amenities"     *
 * - Luồng xử lý ban đầu truyền vào _id homestay,typeData và các trường đơn của typeData đó  *
 *      + Nếu trả về đúng và đủ thì sao tự tạo như bình thường                               *
 *      + Nếu trả về sai typeData thì sẽ trả về lỗi typeData is not correct                  *
 *                                                                                           *
 *********************************************************************************************/
exports.createInformationforHomestays = async (req,res)=>{
    try{
        //Lấy về dữ liệu trong body của request
        const data = req.body;
        const typeData = data.typeData;
        //Kiểm tra xem dữ liệu cần tạo là Rooms hay Services, GeneralService, Signatures
        if(typeData == "Services"){
            
            const services = await UpdateServices.createService(data);
            return res.status(200).json({
                success: true,
                message: "create success",
                content: services
            })
        }
        if(typeData == "GeneralServices"){

            const generalServices = await UpdateServices.createGeneralService(data);
            return res.status(200).json({
                success: true,
                message: "create success",
                content: generalServices
            })
        }
        if(typeData == "Signatures"){

            const signatures = await UpdateServices.createSignature(data);
            return res.status(200).json({
                success: true,
                message: "create success",
                content: signatures
            })
        }
        if(typeData == "Rooms"){

            const rooms = await UpdateServices.createRoom(data);
            return res.status(200).json({
                success: true,
                message: "create success",
                content: rooms
            })
        }
        if(typeData == "Amenities"){

            const amenities = await UpdateServices.createAmenity(data);
            return res.status(200).json({
                success: true,
                message: "create success",
                content: amenities
            })
        }
        return res.status(403).json({
            success: false,
            message: "create fail, typeData is not correct",
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
