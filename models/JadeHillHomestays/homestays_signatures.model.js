const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomestaysSignaturesSchema = new Schema({
    signaturesId: {
        type: Schema.Types.ObjectId,
        ref: 'Signatures',
        required: true
    },
    HomestaysId: {
        type: Schema.Types.ObjectId,
        ref: 'Homestays',
        required: true
    }
});

module.exports = (db) => {
    if (!db.models.HomestaysSignatures) {
        return db.model('HomestaysSignatures', HomestaysSignaturesSchema);
    }
    return db.models.HomestaysSignatures;
}