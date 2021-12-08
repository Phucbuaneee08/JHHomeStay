const {Bills, Services} = require('./../../../models/index');
const {db} = require("../../../helpers/dbHelper");


//Tạo bills với những thông tin nhận được
exports.createBill = async (data)=>{
    await Bills(db).createOne({

        customerName: data.customerName,

        customerIdentification:data.customerIdentification,

        customerEmail:data.customerEmail,

        customerPhoneNumber :data.customerPhoneNumber,

        checkinDate: data.checkinDate,

        checkoutDate: data.checkoutDate,

        active: true,
    })
    .then(data=>{
        return data._id;
    })
}
exports.updatePrice = async (data) =>{
    var price = 0;

    price += await Homestays(db).findOne({_id:data.homestayId})
    .then(data=>{
        return data.price;
    });

    for(let i = 0; i < data.services.length; i++){
        price += await Services(db).findOne({_id:data.services[i]})
        .then(data=>{
            return data.pricePerUnit * data.personServe;
        })
    }

}