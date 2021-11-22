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

// Lấy dữ liệu chi tiết về 1 homestay
// API này chưa test hết các trường hợp lỗi trả về
exports.getHomestayById = async (req, res) => {
    try {
        // Lấy id ở params
        const id = req.params.id;
        // Truy xuất cơ sở dữ liệu bằng id để lấy
        let homestay = await HomestaysService.getHomestayById(id);
        // Nếu thành công trả lại res 200 và toàn bộ thông tin homestay
        return res.status(200).json({
            success: true,
            content: homestay
        });
    } catch (error) {
        // Nếu ko thành công -> 404
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "Homestay's id is not correct!",
            content: error
        });
    }
}