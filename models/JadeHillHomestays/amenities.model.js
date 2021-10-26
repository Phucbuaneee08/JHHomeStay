const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bảng nội thất
const AmenitiesSchema = new Schema({
    name: { // Tên nội thất, ví dụ: Bếp ga, Tủ lạnh toshiba,...
        type: String,
        required: true
    },
    type: { // Loại nội thất, ví dụ: Bếp, Tủ lạnh..
        type: String,
        required: true
    }
});

AmenitiesSchema.virtual('rooms', {
    ref: 'RoomsAmenities',
    localField: '_id',
    foreignField: 'roomsId'
})

module.exports = (db) => {
    if (!db.models.Amenities) {
        return db.model('Amenities', AmenitiesSchema);
    }
    return db.models.Amenities;
}