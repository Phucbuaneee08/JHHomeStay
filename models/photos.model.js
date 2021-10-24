const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Bảng chứa đường link ảnh phòng, ảnh homestays
const PhotosSchema = new Schema (
    {
        url: { //Đường dẫn url cho ảnh phòng, homestay
            type: String,
        },
        homestayId: { // Id định danh homestay, tham chiếu bảng homestay
            type: Schema.Types.ObjectId,
            ref: 'Homestays'
        },
        roomId: { // Id định danh room
            type: Schema.Types.ObjectId,
            ref: 'Rooms'
        }
    },{
        toJSON: { virtuals: true }
    }
);

module.exports = (db) => {
    if (!db.models.Photos)
        return db.model('Photos', PhotosSchema);
    return db.models.Photos;
}