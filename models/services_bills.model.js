const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesBillsSchema = new Schema({ // Liên kết nhiều nhiều giữa services và bills
    servicesId: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    },
    billsId: {
        type: Schema.Types.ObjectId,
        ref: 'Bills',
        required: true
    }
});

module.exports = mongoose.model('ServicesBills', ServicesBillsSchema);