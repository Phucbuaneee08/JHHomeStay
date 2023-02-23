const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    code: {
        type: String
    },
    name: {
        type: String
    },
    value: {
        type: Number
    },
    startDate: {
        type: Date,
    },
    expiredDate: {
        type: Date,
    },
});

module.exports = (db) => {
    if (!db.models.Discounts) {
        return db.model('Discounts', DiscountSchema);
    }
    return db.models.Discounts;
}