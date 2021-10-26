const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillsSchema= new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerIdentification:  {
        type: String,
        required: true
    },
    customerEmail:  {
        type: String,
        required: true
    },
    customerPhoneNumber : {
        type: String,
        required: true
    },
    homestayId: {
        type: Schema.Types.ObjectId,
        ref : 'Homestays',
        required: true,
    },
    checkinDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

BillsSchema.virtual('rooms', {
    ref: 'BillsRooms',
    localField: '_id',
    foreignField: 'roomsId'
});

module.exports = (db) => {
    if (!db.models.Bills) {
        return db.model('Bills', BillsSchema);
    }
    return db.models.Bills;
}