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

ServicesSchema.virtual('bills', {
    ref: 'ServicesBills',
    localField: '_id',
    foreignField: 'servicesId'
})

ServicesSchema.virtual('homestays', {
    ref: 'ServicesHomestays',
    localField: '_id',
    foreignField: 'servicesId'
})

module.exports = mongoose.model('Services', ServicesSchema);