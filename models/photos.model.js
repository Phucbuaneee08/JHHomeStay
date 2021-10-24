const mongoose = require ('mongoose');
const Scheme = mongoose.Schema;

const PhotosSchema = new Schema ({
    url: { //Đường dẫn url cho ảnh phòng, homestay
        type: String,
    },
    homestayId: { // Id định danh homestay, tham chiếu từ bảng homestay
        type: String
    },
    roomId: { // Id định danh room
        type: String
    }
});

module.exports = (db) => {
    if (!db.models.photos)
        return db.models('photos', PhotosSchema);
    return db.models.photos;
}