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

module.exports = mongoose.model('BillsRooms', BillsRoomsSchema);