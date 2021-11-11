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
    },
    bills: [{
        type: Schema.Types.ObjectId,
        ref: 'Bills'
    }],
    homestays: [{
        type: Schema.Types.ObjectId,
        ref: 'Homestays'
    }]
});

ServicesSchema.virtual('bills', {
    ref: 'Bills',
    localField: 'bills',
    foreignField: '_id'
})

ServicesSchema.virtual('homestays', {
    ref: 'Homestays',
    localField: 'homestays',
    foreignField: '_id'
})

module.exports = (db) => {
    if (!db.models.Services) {
        return db.model('Services', ServicesSchema);
    }
    return db.models.Services;
}