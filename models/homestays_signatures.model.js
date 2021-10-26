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

module.exports = mongoose.model('HomestaysSignatures', HomestaysSignaturesSchema);