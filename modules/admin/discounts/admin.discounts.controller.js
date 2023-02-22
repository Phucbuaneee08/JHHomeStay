const DiscountService = require('./admin.discounts.service');

exports.CreateDiscount = async (req, res) => {
    try {
        const name = req.body.name;
        const code = req.body.code;
        const value = req.body.value;
        const startDate = req.body.startDate? req.body.startDate : null;
        const expiredDate = req.body.expiredDate? req.body.expiredDate : null;
        const quantity = req.body.quantity;

        let discount = await DiscountService.CreateDiscount(name, code, value, startDate, expiredDate, quantity);

        return res.status(200).json({
            success: true,
            content: discount
        });

    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}

exports.DeleteDiscount = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const discount = await DiscountService.DeleteDiscount(id);

        return res.status(200).json({
            success: true,
            content: discount
        });
    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}

exports.UpdateDiscount = async (req, res) => {
    try {

        const id = req.body.id;
        const name = req.body.name;
        const code = req.body.code;
        const value = req.body.value;
        const startDate = req.body.startDate? req.body.startDate : null;
        const expiredDate = req.body.expiredDate? req.body.expiredDate : null;
        const quantity = req.body.quantity;

        const message = await DiscountService.UpdateDiscount(id, name, code, value, startDate, expiredDate);
        return res.status(200).json({
            success: true, 
            content: {message: message},
        });
    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}


exports.FindDiscountById = async(req, res) => {
    try 
    {
        const id = req.params.id;
        const discount = await DiscountService.FindDiscountById(id);

        return res.status(200).json(
            {
                success: true,
                content: discount
            }
        )
    }
    catch (error) {
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}

exports.GetAllDiscounts = async(req, res) => {
    try 
    {
        const discounts = await DiscountService.GetAllDiscounts()
        return res.status(200).json(
            {
                success: true,
                content: discounts
            }
        )
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(
            {
                success: false,
                content: error
            }
        );
    }
}