const {Homestays, Rooms, Services, Signatures, GeneralServices, Photos, Amenities} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");

//Lấy thông tin homestays bằng _id
exports.getHomestaysById = async (id)=>{
    const homestays = await Homestays(db).findById(id)
    .populate('services')
    .populate('generalServices')
    .populate('rooms')
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return homestays;   
}

//Lấy thông tin Room bằng _id
exports.getRoomById = async (id)=>{
    const rooms = await Rooms(db).findById(id)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return rooms;
}

//Lấy thông tin Services bằng _id
exports.getServiceById = async (id)=>{
    const services = await Services(db).findById(id)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return services;
} 

//Lấy thông tin Signatures bằng _id
exports.getSignatureById = async (id)=>{
    const signatures = await Signatures(db).findById(id)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return signatures;
}

//Lấy thông tin generalServices bằng _id
exports.getGeneralServiceById = async (id)=>{
    const generalServices = await GeneralServices(db).findById(id)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return generalServices;
}

//Lấy thông tin Photos bằng _id
exports.getPhotoById = async (id)=>{
    const photos = await Photos(db).findById(id)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return photos;
}
//Lấy thông tin Amenities bằng _id
exports.getAmenityById = async (id)=>{
    const amenities = await Amenities(db).findById(id)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        return "";
    })
    return amenities
}

//Update các trường đơn: name, price, type, adress, provice, district, description, available
//Update Homestays
exports.updateHomestay = async (data,homestays) => {
    const modifiedCount = await Homestays(db)
    .updateOne({
        _id:homestays._id
    },{
        name:data.name,
        price:data.price,
        type:data.type,
        address:data.address,
        province:data.province,
        district:data.district,
        description:data.description,
        available:data.available,
    })
    .then(data=>{
        return data.modifiedCount;
    })
    .catch(err=>{console.log(err)})
    return modifiedCount;
}

//Update phòng
exports.updateRoomOfHomestay = async (data,room)=>{
    const modifiedCount = await Rooms(db).updateOne({
        _id:room._id
    },{
        //Các trường của room
        name:data.name,
        price:data.price,
        area:data.area,
        available:data.available,
    })
    .then(data=>{
        return data.modifiedCount;
    })
    .catch(err=>{console.log(err)})
    return modifiedCount;
}

//Update Service
exports.updateServiceOfHomestay = async (data,service)=>{
    const modifiedCount = await Services(db).updateOne({
        _id:service._id
    },{
        //Các trường của service
        name:data.name,
        pricePerUnit:data.pricePerUnit,
        personServe:data.personServe
    })
    .then(data=>{
        return data.modifiedCount;
    })
    .catch(err=>{console.log(err)})
    return modifiedCount;
}
//Update GeneralServices
exports.updateGeneralServiceOfHomestay = async (data,generalService)=>{
    const modifiedCount = await GeneralServices(db)
    .updateOne({
        _id:generalService._id
    },{
        //Các trường của generalService
        name:data.name,
    })
    .then(data=>{
        return data.modifiedCount;
    })
    .catch(err=>{console.log(err)})
    return modifiedCount;
}

//Update Signature
exports.updateSignatureOfHomestay = async (data,signature)=>{
    const modifiedCount = await Signatures(db)
    .updateOne({
        _id:signature.Sid
    },{
        //Các trường của sigSature
        type:data.type,
    })
    .then(data=>{
        return data.modifiedCount;
    })
    .catch(err=>{console.log(err)})
    return modifiedCount;
}

//Update Amenities
exports.updateAmenityOfHomestay = async(data, amenities)=>{
    const modifiedCount = await Amenities(db)
    .updateOne({
        _id:amenities._id
    },{
        //Các trường của amenities
        name:data.name,
        type:data.type,
    })
    .then(data=>{
        return data.modifiedCount;
    })
    .catch(err=>{console.log(err)})
    return modifiedCount;
}

//Xóa thông tin Rooms bằng _id
exports.deleteRoomOfHomestay = async (rooms)=>{
    return Rooms(db).deleteOne({_id:rooms._id});
}

//Xóa thông tin Services bằng _id
exports.deleteServiceOfHomestay = async (services)=>{
    return Services(db).deleteOne({_id:services._id});
}

//Xóa thông tin GeneralServices bằng _id
exports.deleteGeneralServiceOfHomestay = async (generalService)=>{
    return GeneralServices(db).deleteOne({_id:generalService._id});
}

//Xóa thông tin Signature bằng _id
exports.deleteSignatureOfHomestay = async (signature)=>{
    return Signatures(db).deleteOne({_id:signature._id});
}

// Xóa thông tin Amenities bằng _id
exports.deleteAmenityOfRoom = async (amenity)=>{
    return Amenities(db).deleteOne({_id:amenity._id});
}

//Thêm service vào homestays từ thông tin cho trước
exports.createService = async (data)=>{
    const services = await Services(db).create({
        name: data.name,
        pricePerUnit: data.pricePerUnit,
        personServe: data.personServe,
        homestays: data._id,
    })
    const homestays = await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {services: services._id}})
    return services;
}

//Tạo GeneralService vào homestays từ thông tin cho trước
exports.createGeneralService = async (data)=>{

    const generalServices = await GeneralServices(db).create({
        name: data.name,
        homestays: data._id,
    })
    // cập nhật _id của generalService vào homestays
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {generalServices: generalServices._id}})
    return generalServices;

}

//Tạo Signature vào homestays từ thông tin cho trước
exports.createSignature = async (data)=>{

    const signature = await Signatures(db).create({
        type: data.type,
        homestays: data._id,
    })
    // cập nhật _id của generalService vào homestays
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {signatures: signature._id}})
    return signature;
}

//Thêm rooms vào homestays từ thông tin cho trước
exports.createRoom = async (data)=>{
    const room = await Rooms(db).create({
        name:data.name,
        price:data.price,
        area:data.area,
        homestays: data._id,
    })
    // cập nhật _id của generalService vào homestays
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {rooms: room._id}})
    return room;
}

// Thêm Amenities từ thông tin cho trước
exports.createAmenity = async (data)=>{
    const amenity = await Amenities(db).create({
        name:data.name,
        type:data.type
    })
    //Cập nhật _id của generalService vào Rooms
    await Rooms(db).findByIdAndUpdate(data._id,
        {$push: {amenities: amenity._id}})
    return amenity;
}