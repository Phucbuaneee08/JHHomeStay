const { Homestays } = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {home} = require("nodemon/lib/utils");
const {ObjectId} = require('mongodb');
exports.createHomestay = async (adminId, homestayName, homestayProvince, homestayDistrict, homestayAddress, homestayType, homestayPrice, homestayLatitude, homestayLongitude, homestayArea, homestayDescription, homestayAvailable, homestayServices, homestayGeneralServices, homestayAmenities, homestayPhotos ) => {

    let homestay = {
        name : homestayName,
        price : homestayPrice,
        type: homestayType,
        address : homestayAddress,
        province : homestayProvince,
        district : homestayDistrict,
        latitude: homestayLatitude,
        longitude: homestayLatitude,
        area: homestayArea,
        description: homestayDescription,
        available: homestayAvailable,
    };
    if (adminId) {
        homestay = {...homestay, admin: adminId };
    };
    if (homestayAmenities) {
        homestay = {...homestay, amenities: homestayAmenities};
    }
    if (homestayGeneralServices) {
        homestay = {...homestay, generalServices: homestayGeneralServices};
    }
    if (homestayServices) {
        homestay = {...homestay, services: homestayServices};
    }
    if (homestayPhotos) {
        homestay = {...homestay, photos: homestayPhotos};
    }
    homestay = await Homestays(db).create(homestay);

    return homestay
}

exports.getIdAdminByProvince = async ( Province ) => {

    const homestays = await Homestays(db).find({ province : Province })
    .then( homestay =>{
        return homestay;
    });

    let Admins = [];
    for( let i = 0; i < homestays.length; i++){

        if( typeof(homestays[i].admin) !== "undefined" )
        {
            const admin = homestays[i].admin;
    
            if( admin !== "undefined" )
            {
                if( Admins.indexOf( admin ) === -1 )
                    Admins.push( admin );
            }
        }
    }
    
    return Admins;
}
exports.getAllHomestays = async (page, perPage) => {
    let skip = 0;
    if (perPage >= 0) {
        perPage = Number(perPage);
        if (page) {
            page = Number(page);
            skip = perPage * (page - 1);
        }
    }
    let homestays = await Homestays(db).find({}, 'name province district area admin rates')
        .populate('admin', 'email status name')
        .limit(perPage)
        .skip(skip);
    homestays = homestays.map((homestay) => {
        let hasAdmin = false;
        if (homestay.admin !== undefined) {
            hasAdmin = true;
        }
        return {
            ...homestay._doc,
            hasAdmin
        };
    });

    return homestays;
}