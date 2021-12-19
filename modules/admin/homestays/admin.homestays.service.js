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
