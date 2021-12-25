const {Homestays, Bills, Services} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const mongoose  = require('mongoose');
const {ObjectId} = require('mongodb');
const {compare} = require("bcrypt");
const {home} = require("nodemon/lib/utils");
const { restart } = require("nodemon");

//API trả về danh sách các bills theo admin (gửi về bills của các homestays mà admin X có)
exports.getBillsByAdminId = async (id) => {
    // Trả lại danh sách các bill, nhóm các bill theo từng homestay để dễ quản lý bill

    /* Luồng xử lí ở trên là tìm trong bảng Homestay ra các homestay có giá trị trường admin bằng id như yêu cầu,
    *  Sau đó join với bảng bills
    *  và với mỗi homestay mà admin đó quản lý thì chỉ lấy ra trường tên homestay và trường bill
    *  để trả lại cho client*/
    const bills = await Homestays(db).aggregate([
        {
            $match: {
                admin: ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "bills",
                localField: "bills",
                foreignField: "_id",
                as: "bills"
            }
        },
        {
            $project: {
                "_id":1,"name":1,"bills":1
            }
        }
    ])
    return bills;
}

//API trả về danh sách các bills theo homestay
exports.getBillsByHomestayId = async (id, status) => {
    // Trả lại danh sách các bill theo homestay
    console.log(id)
    let homestays = await Homestays(db).aggregate([
        {
            $match: {
                _id: ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "bills",
                localField: "bills",
                foreignField: "_id",
                as: "bills"
            }
        },
        {
            $project: {
                "_id":1,"name":1,"bills":1
            }
        }
    ]);
    let bills = homestays[0].bills.filter((a) => {
        return a.status == status;
    })
    return bills;
}

exports.updateBillsByBillsId = async (billId, customer, customerTogether, homestayId,checkinDate, checkoutDate, status, servicesPerBill) => {
    let setKey = {};
    if (customer) {
        if (customer.name) {setKey = {...setKey, "customer.name": customer.name}}
        if (customer.identification) {setKey = {...setKey, "customer.identification": customer.identification}}
        if (customer.email) {setKey = {...setKey, "customer.email": customer.email}}
        if (customer.phoneNumber) {setKey = {...setKey, "customer.phoneNumber": customer.phoneNumber}}
        if (customer.age !== null) {setKey = {...setKey, "customer.age": customer.age}}
    }
    if (customerTogether) {
        setKey = {...setKey, "customerTogether": customerTogether}
    }
    if (homestayId) {
        setKey = {...setKey, "homestay": homestayId}
    }
    if (checkinDate) {
        setKey = {...setKey, "checkinDate": new Date(checkinDate)}
    }
    if (checkoutDate) {
        setKey = {...setKey, "checkoutDate": new Date(checkoutDate)}
    }
    if (status) {
        setKey = {...setKey, "status": status}
    }
    if (servicesPerBill) {
        setKey = {...setKey, "servicesPerBill": servicesPerBill}
    }
    await Bills(db).updateOne(
        {_id: billId},
        {$set: setKey}
    )
    let bill = await Bills(db).findById(billId);
    await Homestays(db).findOneAndUpdate({_id : bill.homestay},
        {$push: {available: status}})
    return bill;
}




exports.deleteBillsById = async ( Bill_Id ) => {
    let servicesPerBill = [];
    let homestay;
    await Bills(db).findOne({_id: Bill_Id })
    .then(data => {
        servicesPerBill = data.servicesPerBill;
        homestay = data.homestay;
    })

    for (let i = 0; i < servicesPerBill.length; i++){
        const idService = servicesPerBill[i].services;
        await Services(db).deleteOne({ _id: idService });
    }
    
    //Lấy ra danh sách id bills sau khi đã xóa id bills
    const idBills = await Homestays(db).findOne({_id : homestay})
    .then(data => {

        let bills = [];
        const a = new ObjectId(Bill_Id);
        
        for(let i = 0; i < data.bills.length; i++){
            if( data.bills[i] === a )
            bills = [...bills, data.bills[i]];
        }

        return bills;
    })
    
    //Cập nhật lại danh sách bills
    await Homestays(db).findByIdAndUpdate({_id : homestay},
        {
            bills : idBills
        }
    )
    
    // Gọi hàm xóa Bill theo Id
    await Bills(db).deleteOne({ _id:Bill_Id });

}

exports.findBillsById = async ( Bill_Id ) =>{

    return Bills(db).findById({ _id: Bill_Id });

}
