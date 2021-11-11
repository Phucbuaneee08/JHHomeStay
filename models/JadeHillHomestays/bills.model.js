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
        required: false
    },
    price : {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    rooms: [{ // danh sách FK tham chiếu tới rooms
        type: Schema.Types.ObjectId,
        ref:'Rooms'
    }],
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Services'
    }]
});

BillsSchema.virtual('rooms', {
    ref: 'Rooms',
    localField: 'rooms',
    foreignField: '_id'
});

BillsSchema.virtual('services', {
    ref: 'Services',
    localField: 'services',
    foreignField: '_id'
})

module.exports = (db) => {
    if (!db.models.Bills) {
        return db.model('Bills', BillsSchema);
    }
    return db.models.Bills;
}