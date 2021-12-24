const { Homestays } = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {home} = require("nodemon/lib/utils");

exports.createHomestay = async (adminId, homestayName, homestayProvince, homestayDistrict, homestayAddress, homestayType, homestayPrice ) => {

    const homestay = await Homestays(db).create({
        admin : adminId,
        name : homestayName,
        province : homestayProvince,
        district : homestayDistrict,
        address : homestayAddress,
        type: homestayType,
        price : homestayPrice

    })

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
            const admin = homestays[i].admin[0];
    
            if( admin !== "inderfines" )
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