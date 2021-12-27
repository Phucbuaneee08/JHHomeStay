const {Bills, Services, Homestays} = require('./../../../models/index');
const {db} = require("../../../helpers/dbHelper");
const {ObjectId} = require("mongodb");


//Tạo bills với những thông tin nhận được
exports.createBill = async ( data ) => {
    
    // Lấy thông tin homestays bằng _id
    const homestay = await Homestays(db).findById({ _id:data._id })
    .then( homestay => {
        return homestay;
    })


    //Nhập các trường đơn và trả về _id của Bills để cập nhật các trường liên kết của Bills
    //Trong đó trường chưa có trường price vì chưa tính ở đây
    const _idBill = await Bills(db).create({

        homestay : { _id:data._id },
        checkinDate : data.checkinDate ,
        checkoutDate : data.checkoutDate ,
        status: data.status,
        price:0,

    })
    .then( bill =>{ 
        return bill._id;
    })
    
    //Cập nhật thông tin customer cho Bills
    console.log(data.customer)
    await Bills(db).findByIdAndUpdate( { _id:_idBill },
        {
            $set: {
                customer: data.customer
            }
        }
    )

    //Cập nhật tên và tuổi cho những thành viên đi cùng với đoàn
    for( let i = 0 ; i < data.customerTogether.length ; i++ ){
    
        await Bills(db).findByIdAndUpdate({ _id:_idBill }, 
            { $push: { customerTogether : data.customerTogether[i] }})
    
    }

    // Cập nhật Services mà khách chọn
    for( let i = 0 ; i < data.servicesPerBill.length ; i++ ){
    
        await Bills(db).findByIdAndUpdate({ _id:_idBill }, 
            { $push: { servicesPerBill : data.servicesPerBill[i] }})
    
    }

    /**********************************************************************
     *                                                                    *
     * Tính tổng giá thuê homestays + services đi kèm và update vào Bills * 
     *                                                                    *
     * ********************************************************************/

    //Lấy giá của homestays/1 ngày mà bills tham chiếu tới
    const priceHomestayPerDay = homestay.price;

    //Tính giá thuê homestays chưa có services
    const priceHomestay = await Bills(db).findById({ _id : _idBill })
    .then( Bill => {
        const numberOfDays = (Bill.checkoutDate - Bill.checkinDate) / ( 24 * 60 * 60 * 1000 ) ;

        return (numberOfDays *  priceHomestayPerDay); 
        
    })

    //Cập nhật giá thuê homestays chưa có services vào bill
    await Bills(db).findByIdAndUpdate(

        {
             _id : _idBill 
        },    

        {
            $inc : { price : priceHomestay },
        },   

    )
    
    //Lấy về danh sách thông tin services trong bill
    const services = await Bills(db).findById({ _id : _idBill })
    .populate({
        path : 'servicesPerBill',
        populate : { path : 'services' }
    })
    .then( bill => {
        return bill.servicesPerBill ;
    })

    //Update priceService
    for( let i = 0; i < services.length; i++ ){

        var priceService = services[i].count * services[i].services.pricePerUnit;
        await Bills(db).findByIdAndUpdate(

            {
                 _id : _idBill
            },    

            {
                $inc : { price : priceService },
            },   

        )
        
    }

    // đẩy bill vào homestays
    await Homestays(db).findByIdAndUpdate(data._id, { $push: {bills: _idBill}});
}

