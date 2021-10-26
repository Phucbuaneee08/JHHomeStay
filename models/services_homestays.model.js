const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesHomestaysSchema = new Schema({
    servicesId: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    },
    homestaysId: {
        type: Schema.Types.ObjectId,
        ref: 'Homestays',
        required: true
    }
});

module.exports = mongoose.model('ServicesHomestays', ServicesHomestaysSchema);