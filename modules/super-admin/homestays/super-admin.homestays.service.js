const { Homestays } = require("../../../models");
const {db} = require("../../../helpers/dbHelper");

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