const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomsSchema= new Schema({
    name: {
        type: String,
        required: true
    },
    // price :{ Không cần trường này nữa vì mình thực hiện đặt theo homestays
    //     type: Number,
    //     required: true
    // },
    area : {
        type: Number,
        required: true
    },
    // available: { Không cần trường này nữa vì mình thực hiện đặt theo homestays
    //     type: Number, //1 cho chua co nguoi dat, 2 cho dang co nguoi dat, 3 cho da co nguoi dat//
    //     required: true
    // },
    homestays: {
        type: Schema.Types.ObjectId,
        required: false
    },
    bills: [{ // danh sách FK tham chiếu tới bills
        type: Schema.Types.ObjectId,
        ref: 'Bills'
    }],
    amenities: [{
        type: Schema.Types.ObjectId,
        ref: 'Amenities'
    }],
    photos: [{
        type: Schema.Types.ObjectId,
        ref: 'Photos'
    }]
});

module.exports = (db) => {
    if (!db.models.Rooms) {
        return db.model('Rooms', RoomsSchema);
    }
    return db.models.Rooms;
}