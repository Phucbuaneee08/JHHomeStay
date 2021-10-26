//require thư viện mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//tạo ra quan hệ GeneralServices
const GeneralServicesSchema = new Schema({
    //tạo ra thuộc tính name và homeStayId
    name: {
        type: String,
        require: true
    },
    homestayId: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('GeneralServices', GeneralServicesSchema);