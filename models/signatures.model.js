//require thư viện mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//tạo ra quan hệ Signaturers
const SignaturesSchema = new Schema({

    type:{ // type: 1 - ...; 2 - ...; 3 - ...; v.v
        type: Number,
        require:true
    }
});

module.exports = mongoose.model('Signatures', SignaturesSchema)