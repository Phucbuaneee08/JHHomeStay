//require thư viện mongoose
const mongoose = require('mongoose');
//kết nối với MongoDB Compass
// mongoose.connect('mongodb://localhost/Model',{  //khi chạy trên local thì để ý hàm này
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });

const Schema = mongoose.Schema;
const Signatures = new Schema({
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
