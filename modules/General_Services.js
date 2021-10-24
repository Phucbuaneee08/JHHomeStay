//require thư viện mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//tạo ra quan hệ General_Services
const General_Services = new Schema({
    //tạo ra thuộc tính name và homeStayId
    name:{
        type:String,
        require: true
    },
    homestayId:{
        type: String,
        require:true
    }
},{
    collection:General_Services,
}
)

//tạo biến model
const GSModel = mongoose.model('General_Services',General_Services);

module.exports = (db) => {
    if (!db.models.General_Services)
        return db.model('General_Services', General_ServicesSchema);
    return db.models.General_Services;
}
