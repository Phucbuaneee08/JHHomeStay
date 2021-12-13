const {Homestays, Rooms, Services, Signatures, GeneralServices, Photos, Amenities} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");

//Update Homestays Service
exports.updateHomestay = async (homestayId, homestayName, homestayPrice, homestayType, homestayAddress,homestayProvince, homestayDistrict, homestayLatitude, homestayLongitude, homestayArea, homestayDescription, homestayAvailable, homestayAmenities, homestayServices, homestayGeneralServices, homestayPhotos) =>{
    // Tạo object rỗng để chứa các thông tin cần cập nhật 
    let setHomestay = {};

    // Kiểm tra và cập nhật
    if( homestayName ){
        setHomestay = {...setHomestay, "name": homestayName};
    }

    if( homestayPrice ){
        setHomestay = {...setHomestay, "price": homestayPrice};
    }

    if( homestayType ){
        setHomestay = {...setHomestay, "type": homestayType};
    }

    if( homestayAddress ){
        setHomestay = {...setHomestay, "address": homestayAddress};
    }

    if( homestayProvince ){
        setHomestay = {...setHomestay, "province": homestayProvince};
    }

    if( homestayDistrict ){
        setHomestay = {...setHomestay, "district": homestayDistrict};
    }

    if( homestayLatitude ){
        setHomestay = {...setHomestay, "latitude": homestayLatitude};
    }

    if( homestayLongitude ){
        setHomestay = {...setHomestay, "longitude": homestayLongitude};
    }

    if( homestayArea ){
        setHomestay = {...setHomestay, "area": homestayArea};
    }

    if( homestayDescription ){
        setHomestay = {...setHomestay, "description": homestayDescription};
    }

    if( homestayAvailable ){
        setHomestay = {...setHomestay, "available": homestayAvailable};
    }

    if( homestayAmenities ){
        setHomestay = {...setHomestay, "amenities": homestayAmenities};
    }

    if( homestayServices ){
        setHomestay = {...setHomestay, "services": homestayServices};
    }

    if( homestayGeneralServices ){
        setHomestay = {...setHomestay, "generalServices": homestayGeneralServices};
    }

    if( homestayPhotos ){
        setHomestay = {...setHomestay, "photos": homestayPhotos};
    }

    // Cập nhật vào database
    await Homestays(db).findByIdAndUpdate(
        { _id: homestayId },
        { $set: setHomestay }
    );

    //Trả lại thông tin homestay sau khi update
    const homestay = await Homestays(db).findOne({ _id: homestayId });
    
    return homestay;
}

//Tạo service vào homestays từ thông tin cho trước
exports.createServicesById = async (data,_id)=>{
    const services = await Services(db).create({
        name: data.name,
        pricePerUnit: data.pricePerUnit,
        personServe: data.personServe,
        homestays: _id,
    })
    const homestays = await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {services: services._id}});
}

//Tạo GeneralService vào homestays từ thông tin cho trước
exports.createGeneralServicesById = async (data,_id)=>{
    const generalServices = await GeneralServices(db).create({
        name: data.name,
        homestays:_id,
    })
    // cập nhật _id của generalService vào homestays
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {generalServices: generalServices._id}})
}

//Tạo Signatures vào homestays từ thông tin cho trước
exports.createSignaturesById = async (data,_id)=>{

    const signature = await Signatures(db).create({
        type: data.type,
        homestays: _id,
    })
    // cập nhật _id của signatures vào homestays
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {signatures: signature._id}})
}

//Tạo Rooms vào homestays từ thông tin cho trước
exports.createRoomsById = async (data,_id)=>{
    const room = await Rooms(db).create({
        name:data.name,
        price:data.price,
        area:data.area,
        homestays:_id,
    })
    // cập nhật _id của rooms vào homestays
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {rooms: room._id}})
}

// Tạo Amenities từ thông tin cho trước
exports.createAmenitiesById = async (data)=>{
    const amenities = await Amenities(db).create({
        name:data.name,
        type:data.type
    })
    //Cập nhật _id của amenities vào Rooms
    await Rooms(db).findByIdAndUpdate(data._idRoom,
        {$push: {amenities: amenities._id}})
}

// Tạo Photos từ thông tin cho trước
exports.createPhotosById = async (data,_id)=>{
    const photos = await Photos(db).create({
        url:data.url,
        homestays:_id
    })
    //Cập nhật _id của Photos vào Rooms
    await Homestays(db).findByIdAndUpdate(data._id,
        {$push: {photos: photos._id}})
}