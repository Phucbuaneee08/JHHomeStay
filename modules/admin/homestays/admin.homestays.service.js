const {Homestays, Rooms, Services, Signatures, GeneralServices, Photos, Amenities} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");

//Update Homestays
exports.updateHomestaysById = async (data) => {
    //Nếu name mà không trống hoặc không có trường name trong req thì không cập nhật
    var modifiedCount=0;
    if(typeof(data.name) != "undefined" && data.name != ""){
        await Homestays(db).updateOne({_id:data._id},{name:data.name});
        modifiedCount++;
    }
    //Nếu price mà không trống hoặc không có trường price trong req thì không cập nhật
    if(typeof(data.price) != "undefined" && data.price != ""){
        await Homestays(db).updateOne({_id:data._id},{price:data.price});
        modifiedCount++;
    }
    //Nếu type mà không trống hoặc không có trường type trong req thì không cập nhật
    if(typeof(data.type) != "undefined" && data.type != ""){
        await Homestays(db).updateOne({_id:data._id},{type:data.type});
        modifiedCount++;
    }
    //Nếu address mà không trống hoặc không có trường address trong req thì không cập nhật
    if(typeof(data.address) != "undefined" && data.address != ""){
        await Homestays(db).updateOne({_id:data._id},{address:data.address});
        modifiedCount++;
    }
    //Nếu province mà không trống hoặc không có trường province trong req thì không cập nhật
    if(typeof(data.province) != "undefined" && data.province != ""){
        await Homestays(db).updateOne({_id:data._id},{province:data.province});
        modifiedCount++;
    }
    //Nếu district mà không trống hoặc không có trường district trong req thì không cập nhật
    if(typeof(data.district) != "undefined" && data.district != ""){
        await Homestays(db).updateOne({_id:data._id},{district:data.district});
        modifiedCount++;
    }
    //Nếu latitude mà không trống hoặc không có trường latitude trong req thì không cập nhật
    if(typeof(data.latitude) != "undefined" && data.latitude != ""){
        await Homestays(db).updateOne({_id:data._id},{latitude:data.latitude});
        modifiedCount++;
    }
    //Nếu longitude mà không trống hoặc không có trường longitude trong req thì không cập nhật
    if(typeof(data.longitude) != "undefined" && data.longitude != ""){
        await Homestays(db).updateOne({_id:data._id},{longitude:data.longitude});
        modifiedCount++;
    }
    //Nếu area mà không trống hoặc không có trường area trong req thì không cập nhật
    if(typeof(data.area) != "undefined" && data.area != ""){
        await Homestays(db).updateOne({_id:data._id},{area:data.area});
        modifiedCount++;
    }
    //Nếu description mà không trống hoặc không có trường description trong req thì không cập nhật
    if(typeof(data.description) != "undefined" && data.description != ""){
        await Homestays(db).updateOne({_id:data._id},{description:data.description});
        modifiedCount++;
    }
    //Nếu available mà không trống hoặc không có trường available trong req thì không cập nhật
    if(typeof(data.available) != "undefined" && data.available != ""){
        await Homestays(db).updateOne({_id:data._id},{available:data.available});
        modifiedCount++;
    }
   
    return modifiedCount;
}
//Update Service
exports.updateServicesById = async (data)=>{
    await Homestays(db).findByIdAndUpdate( {_id:data._id} , { $set : {'services':[] }}, {multi:true} )

    for(let i = 0; i < data.services.length; i++){
        await Homestays(db).findByIdAndUpdate(
            {_id:data._id}, 
            {$push: {services: data.services[i]}}
        )
    }
}

//Update GeneralServices
exports.updateGeneralServicesById = async (data)=>{
    await Homestays(db).findByIdAndUpdate( {_id:data._id} , { $set : {'generalServices':[] }}, {multi:true} )

    for(let i = 0; i < data.generalServices.length; i++){
        await Homestays(db).findByIdAndUpdate(
            {_id:data._id}, 
            {$push: {generalServices: data.generalServices[i]}}
        )
    }

}

//Update Amenities
exports.updateAmenitiesById = async(data)=>{
    await Homestays(db).findByIdAndUpdate( {_id:data._id} , { $set : {'amenities':[] }}, {multi:true} )

    for(let i = 0; i < data.amenities.length; i++){
        await Homestays(db).findByIdAndUpdate(
            {_id:data._id}, 
            {$push: {amenities: data.amenities[i]}}
        )
    }
}
//Update Photos
exports.updatePhotosById = async(data)=>{
    await Homestays(db).findByIdAndUpdate( {_id:data._id} , { $set : {'photos':[] }}, {multi:true} )

    for(let i = 0; i < data.photos.length; i++){
        await Homestays(db).findByIdAndUpdate(
            {_id:data._id}, 
            {$push: {photos: data.photos[i]}}
        )
    }
}


