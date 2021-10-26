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

module.exports = (db) => {
    if (!db.models.ServicesHomestays) {
        return db.model('ServicesHomestays', ServicesHomestaysSchema);
    }
    return db.models.ServicesHomestays;
}