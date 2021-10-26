const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema= new Schema({
    name: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    personServe : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Services', ServicesSchema);