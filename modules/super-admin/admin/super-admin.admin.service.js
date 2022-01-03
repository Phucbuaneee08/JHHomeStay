const {Users, Bills, Homestays} = require("../../../models");
const {db} = require("../../../helpers/dbHelper");
const {home} = require("nodemon/lib/utils");
const {authToken} = require("../../../middleware");
const {ObjectId} = require('mongodb');

//API để super admin chỉnh sửa thông tin Admin
exports.updateAdminById = async (id, name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateAtBirth, homestays) => {
    let setKey = {};
    if (name) {
        setKey = {...setKey, "name": name}
    }
    if (address) {
        setKey = {...setKey, "address": address}
    }
    if (role) {
        setKey = {...setKey, "role": role}
    }
    if (email) {
        setKey = {...setKey, "email": email}
    }
    if (password) {
        setKey = {...setKey, "password": password}
    }
    if (phone) {
        setKey = {...setKey, "phone": phone}
    }
    if (status) {
        setKey = {...setKey, "status": status}
    }
    if (gender) {
        setKey = {...setKey, "gender": gender}
    }
    if (identification) {
        setKey = {...setKey, "identification": identification}
    }
    if (avatarUrl) {
        setKey = {...setKey, "avatarUrl": avatarUrl}
    }
    if (dateAtBirth) {
        setKey = {...setKey, "dateAtBirth": new Date(dateAtBirth)}
    }
    if (homestays) {
        setKey = {...setKey, "homestays": homestays}
    }

    await Users(db).update(
        {_id: id},
        {$set: setKey}
    )
    let admin = (await Users(db).findById(id));
    for (let i = 0; i < admin.homestays.length; i ++) {
        await Homestays(db).findOneAndUpdate({_id : admin.homestays[i]},
            {$push: {admin: id}})
    }
    return admin;
}

exports.createAdmin = async (name, address, role, email, password, phone, status, gender, identification, avatarUrl, dateAtWork, dateAtBirth, homestays) => {
    if (!name || !role || !email || !password || !phone || !identification || !dateAtWork || !homestays || (role !== "admin"))
        return 0;
    let adminWithId = await Users(db).findOne(
        {identification: identification}
    )
    if (adminWithId) return 1;
    let createKey = {};
    if (name) {
        createKey = {...createKey, name: name}
    }
    if (address) {
        createKey = {...createKey, address: address}
    }
    if (email) {
        createKey = {...createKey, email: email}
    }
    if (password) {
        createKey = {...createKey, password: password}
    }
    if (phone) {
        createKey = {...createKey, phone: phone}
    }
    if (status) {
        createKey = {...createKey, status: status}
    }
    if (gender) {
        createKey = {...createKey, gender: gender}
    }
    if (identification) {
        createKey = {...createKey, identification: identification}
    }
    if (avatarUrl) {
        createKey = {...createKey, avatarUrl: avatarUrl}
    }
    if (dateAtWork) {
        createKey = {...createKey, dateAtWork: new Date(dateAtWork)}
    }
    if (dateAtBirth) {
        createKey = {...createKey, dateAtBirth: new Date(dateAtBirth)}
    }
    if (homestays) {
        createKey = {...createKey, homestays: homestays}
    }
    let admin = await Users(db).create(createKey);
    console.log(admin);
    console.log(admin.homestays);
    for (let i = 0; i < admin.homestays.length; i ++ ) {
        await Homestays(db).findOneAndUpdate({_id : admin.homestays[i]},
            {$push: {admin: admin.id}})
    }
    return admin;
}


// Giao homestay cho admin
exports.assignAdminToHomestay = async (adminId, homestayId) => {
    await Users(db).findByIdAndUpdate(adminId, {
        $push: { homestays: homestayId}
    });
    await Homestays(db).findByIdAndUpdate(homestayId,{
        $set: { admin: adminId}
    });
    let modifyAdmin = await Users(db).findById(adminId);
    return modifyAdmin;
}

// Xóa admin và tham chiếu
exports.deleteAdmin = async (id) => {
    await Users(db).deleteOne({ _id: ObjectId(id) });
    // Xóa tham chiếu
    await Homestays(db).updateMany(
        { admin: ObjectId(id) },
        {
            $pull: { admin: ObjectId(id) }
        }
    );
}

// Xóa homestay và tham chiếu
exports.deleteHomestay = async (id) => {
    await Homestays(db).deleteOne({ _id: ObjectId(id) });
    // Xóa tham chiếu
    await Users(db).updateMany(
        {},
        { $set: { "homestays.$[element]": null } },
        { arrayFilters: [ { "element": ObjectId(id) } ] }
    );
    await Bills(db).deleteMany(
        { homestay: ObjectId(id) }
    );
}

// Lấy danh sách admin
exports.getAdmins = async () => {
    return await Users(db).find({role: 'admin', status: 1}, '_id name email phone gender avatarUrl');
}