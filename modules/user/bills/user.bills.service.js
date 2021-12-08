const {Bills, Services, Homestays} = require('./../../../models/index');
const {db} = require("../../../helpers/dbHelper");


//Tạo bills với những thông tin nhận được và bills tính giá của Services
exports.createBill = async ( data ) => {
    
    // Lấy thông tin homestays bằng _id
    const homestay = await Homestays(db).findById({ _id:data._id })
    .then(data => {
        return data;
    })
    console.log(homestay.price);

    //Nhập các trường đơn và trả về _id của Bills để cập nhật các trường liên kết của Bills
    //Trong đó trường price sẽ khởi tạo là giá của homestays chưa tính services
    const _id = await Bills(db).create({

        homestay : { _id:data._id },
        checkinDate : new Date( data.checkinDate ),
        checkoutDate : new Date( data.checkoutDate ),
        status: 1,
        price:homestay.price,

    })
    // .populate('customer')
    // .populate('homestay')
    .then(data=>{ 
        return data._id;
    })
    
    //Cập nhật thông tin customer cho Bills
    await Bills(db).findByIdAndUpdate( { _id:_id }, 
        {
        customer : {
            $push : {
                name : data.name,
                identification : data.identification,
                email : data.email,
                phoneNumber : data.phoneNumber,
                age : data.age
                }
            }
        }
    )

    //Cập nhật tên và tuổi cho những thành viên đi cùng với đoàn
    for( let i = 0 ; i < data.customerTogether.length ; i++ ){
    
        await Bills(db).findByIdAndUpdate({ _id:_id }, 
            { $push: { customerTogether : data.customerTogether[i] }})
    
    }

    //Cập nhật Services mà khách chọn
    for( let i = 0 ; i < data.servicesPerBill.length ; i++ ){
    
        await Bills(db).findByIdAndUpdate({ _id:_id }, 
            { $push: { servicesPerBill : data.servicesPerBill[i] }})
    
    }


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