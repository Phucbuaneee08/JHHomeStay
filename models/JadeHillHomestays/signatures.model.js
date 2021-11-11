//require thư viện mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//tạo ra quan hệ Signaturers
const SignaturesSchema = new Schema({
    type:{ // type: 1 - ...; 2 - ...; 3 - ...; v.v
        type: Number,
        require:true
    },
    homestays: [{
        type: Schema.Types.ObjectId,
        ref: 'Homestays'
    }]
});

SignaturesSchema.virtual('homestays', {
    ref: 'Homestays',
    localField: 'homestays',
    foreignField: '_id'
})

module.exports = (db) => {
    if (!db.models.Signatures) {
        return db.model('Signatures', SignaturesSchema);
    }
    return db.models.Signatures;
}