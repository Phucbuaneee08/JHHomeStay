const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillsRoomsSchema = new Schema({
    billsId: {
        type: Schema.Types.ObjectId,
        ref: 'Bills',
        required: true
    },
    roomsId: {
        type: Schema.Types.ObjectId,
        ref: 'Rooms',
        required: true
    }
});

module.exports = (db) => {
    if (!db.models.BillsRooms) {
        return db.model('BillsRooms', BillsRoomsSchema);
    }
    return db.models.BillsRooms;
}