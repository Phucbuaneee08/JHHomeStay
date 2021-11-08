const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomsSchema= new Schema({
    name: {
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    area : {
        type: Number,
        required: true
    },
    available: {
        type: Number, //1 cho chua co nguoi dat, 2 cho dang co nguoi dat, 3 cho da co nguoi dat//
        required: true
    },
    homestayId: {
        type: Schema.Types.ObjectId,
        required: false
    }
});

RoomsSchema.virtual('amenities', {
    ref: 'RoomsAmenities',
    localField: '_id',
    foreignField: 'roomsId'
});

RoomsSchema.virtual('bills', {
    ref: 'BillsRooms',
    localField: '_id',
    foreignField: 'roomsId'
})

RoomsSchema.virtual('homestays', {
    ref: 'Homestays',
    localField: '_id',
    foreignField: 'roomsId'
})

RoomsSchema.virtual('photos', {
    ref: 'Photos',
    localField: '_id',
    foreignField: 'roomsId'
})

module.exports = (db) => {
    if (!db.models.Rooms) {
        return db.model('Rooms', RoomsSchema);
    }
    return db.models.Rooms;
}