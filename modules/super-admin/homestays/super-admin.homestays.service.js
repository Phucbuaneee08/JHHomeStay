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