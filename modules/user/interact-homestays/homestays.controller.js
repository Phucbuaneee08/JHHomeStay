const HomestaysService = require('./homestays.service');

exports.getRankingHomestays = async (req, res) => {
    try {
        const { quantity } = req.query;
        const homestays = await HomestaysService.getRankingHomestays(quantity);

        res.status(200).json({
            success: true,
            messages: ["get_ranking_homestays_success"],
            content: homestays
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ["get_ranking_homestays_failed"],
            content: error,
        });
    }
};

exports.createRatingOfHomestay = async (req, res) => {
    try {
        const { id, rate } = req.body;
        rate.createdAt = Date.now();
        const homestay =  HomestaysService.createRating(id, rate);
        res.status(200).json({
            success: true,
            messages: ["create_rate_success"],
            content: homestay
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ["create_rate_failed"],
            content: error,
        });
    }
};

exports.edit = (req, res) => {
    //code here
};

exports.delete = (req, res) => {
    //code here
};