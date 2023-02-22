const { Discounts } = require("../../../models");
const { db } = require('../../../helpers/dbHelper');

exports.CreateDiscount = async (name, code, value, startDate, expiredDate, quantity) => {
    const sDate = new Date(startDate);
    const eDate = new Date(expiredDate);
    const discount = await Discounts(db).create({ name, code, value, startDate: sDate, expiredDate: eDate, quantity });
    return discount;
}

exports.GetAllDiscounts = async () => {
    console.log('Get all discounts');
    const discounts = await Discounts(db).find({});
    console.log(discounts)
    return discounts;
}

exports.FindDiscountById = async (discountId) => {
    console.log(discountId);
    const discount = await Discounts(db).findById(discountId);
    return discount;
}

exports.UpdateDiscount = async (discountId, name, code, value, startDate, expiredDate, quantity) => {

    const discount = await this.FindDiscountById(discountId);
    if (discount) {
        await Discounts(db).updateOne(
            { _id: discountId },
            { $set: { name, code, value, startDate, expiredDate, quantity} }
        );
        return "Discount updated";
    }

    return "Discount not found";
}

exports.DeleteDiscount = async (discountId) => {
    const discount = await Discounts(db).findById(discountId);

    if (discount) {
        await Discounts(db).deleteOne({ _id: discountId });
        return discount;
    }

    return null;
}