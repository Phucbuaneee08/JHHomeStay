const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const RoomsAmenitiesSchema = new Schema({
    roomsId: {
        type: Schema.Types.ObjectId,
        ref: 'Rooms',
        required: true
    },
    amenitiesId: {
        type: Schema.Types.ObjectId,
        ref: 'Amenities',
        required: true
    }
});

module.exports = (db) => {
    if (!db.models.RoomsAmenities) {
        return db.model('RoomsAmenities', RoomsAmenitiesSchema);
    }
    return db.models.RoomsAmenities;
}