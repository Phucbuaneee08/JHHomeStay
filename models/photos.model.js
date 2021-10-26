const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Bảng chứa đường link ảnh phòng, ảnh homestays
const PhotosSchema = new Schema (
    {
        url: { //Đường dẫn url cho ảnh phòng, homestay
            type: String,
            required: true
        },
        homestaysId: { // Id định danh homestay, tham chiếu bảng homestays
            type: Schema.Types.ObjectId,
            ref: 'Homestays',
            required: true
        },
        roomsId: { // Id định danh room, tham chiếu bảng rooms
            type: Schema.Types.ObjectId,
            ref: 'Rooms',
            required: true
        }
    });

module.exports = mongoose.model('Photos', PhotosSchema);