//require thư viện mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//tạo ra quan hệ Signaturers
const Signatures = new Schema({
    //tạo thuộc tính name
    name:{
        type:String,
        require:true
    }
},{
    Collection:Signatures
})
const signaturesModel = mongoose.module('Signatures',Signatures)
module.exports = (db) => {
    if (!db.models.Signatures)
        return db.model('Signatures', SignaturesSchema);
    return db.models.Signatures;
}
