//require thư viện mongoose
const mongoose = require('mongoose');
//kết nối với MongoDB Compass
// mongoose.connect('mongodb://localhost/Model',{  //khi chạy trên local thì để ý hàm này
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });

const Schema = mongoose.Schema;
//tạo ra Schema General_Services
const General_Services = new Schema({
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
