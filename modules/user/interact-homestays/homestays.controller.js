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

exports.getHomestayByFilter = async (req, res) => {
    try {
        // Lấy thông tin filter ở query parameters: province, type, lowPrice, highPrice, các mảng amenities và generalServices
        const data = req.query;

        const province = (data.province)?data.province:null;
        const type = (data.type)?data.type:null;
        const averageRates = (data.averageRates)?data.averageRates:0;
        const minPrice = (data.minPrice)?data.minPrice:null;
        const maxPrice = (data.maxPrice)?data.maxPrice:null;
        const amenities = (data.amenities)?data.amenities: null;
        const generalServices = (data.generalServices)?data.generalServices: null;

        //Lấy số hiệu slide trả về, ban đầu auto là 1.
        const slice = (data.slice)?data.slice:0;

        // Truy xuất cơ sở dữ liệu bằng filter để lấy mảng homestays
        let homestayArray = (await HomestaysService.getHomestayByFilter(province, type, averageRates, minPrice, maxPrice, generalServices, amenities, slice)).homestays;
        let sliceTotal = (await HomestaysService.getHomestayByFilter(province, type, averageRates, minPrice, maxPrice, generalServices, amenities, slice)).sliceTotal;

        // Nếu thành công trả lại res 200 và toàn bộ thông tin các homestay
        if (sliceTotal === 0) {
            return res.status(400).json({
                success: true,
                content: sliceTotal,
                message : "No slice"
            })
        }
        else return res.status(200).json({
            success: true,
            content: { homestays: homestayArray, sliceTotal : sliceTotal },
            message: sliceTotal + " slice"
        });
    } catch (error) {
        // Nếu ko thành công -> 404
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "Some error founded!",
            content: error
        });
    }
}
