const {Bills, Services, Homestays} = require('./../../../models/index');
const {db} = require("../../../helpers/dbHelper");


//Tạo bills với những thông tin nhận được và bills tính giá của Services
exports.createBill = async ( data ) => {
    
    // Lấy thông tin homestays bằng _id
    const homestay = await Homestays(db).findById({ _id:data._id })
    .then(data => {
        return data;
    })

    //Nhập các trường đơn và trả về _id của Bills để cập nhật các trường liên kết của Bills
    //Trong đó trường price sẽ khởi tạo là price của homestays / 1 ngày
    const _id = await Bills(db).create({

        homestay : { _id:data._id },
        checkinDate : new Date( data.checkinDate ),
        checkoutDate : new Date( data.checkoutDate ),
        status: 1,
        price: homestay.price,

    })
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
        },

    )

    //Cập nhật tên và tuổi cho những thành viên đi cùng với đoàn
    for( let i = 0 ; i < data.customerTogether.length ; i++ ){
    
        await Bills(db).findByIdAndUpdate({ _id:_id }, 
            { $push: { customerTogether : data.customerTogether[i] }})
    
    }

    // Cập nhật Services mà khách chọn
    for( let i = 0 ; i < data.servicesPerBill.length ; i++ ){
    
        await Bills(db).findByIdAndUpdate({ _id:_id }, 
            { $push: { servicesPerBill : data.servicesPerBill[i] }})
    
    }

    //Trả lại _id Bills sau khi đã tạo Bills
    return _id;

}

exports.updatePrice = async ( Bill_Id ) =>{

    //Lấy về danh sách servicesPerBill
    const servicesPerBill = await Bills(db).findById({ _id : Bill_Id })
    .populate({
        path : 'servicesPerBill',
        populate : { path : 'services' }
    })
    .then( data => {
        return data.servicesPerBill ;
    })

    //Tính giá thuê homestays chưa có services
    const priceHomestay = await Bills(db).findById({ _id : Bill_Id })
    .then( Bill => {
        const numberOfDays = (Bill.checkoutDate - Bill.checkinDate) / ( 24 * 60 * 60 * 1000 ) - 2 ;

        return numberOfDays * Bill.price ;
        
    })

    //Cập nhật giá thuê homestays chưa có services vào bill
    await Bills(db).findByIdAndUpdate(

        {
             _id : Bill_Id 
        },    

        {
            $inc : { price : priceHomestay },
        },   

    )

    //Update priceService
    for( let i = 0; i < servicesPerBill.length; i++ ){

        var priceService = servicesPerBill[i].count * servicesPerBill[i].services.pricePerUnit;

        await Bills(db).findByIdAndUpdate(

            {
                 _id : Bill_Id 
            },    

            {
                $inc : { price : priceService },
            },   

        )
        
    }

}