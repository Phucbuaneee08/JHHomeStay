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
        const rate = (data.rate)?data.rate:0;
        const lowPrice = (data.lowPrice)?data.lowPrice:null;
        const highPrice = (data.highPrice)?data.highPrice:null;
        const amenitiesArray = (data.amenities)?data.amenities: null;
        const generalServicesArray = (data.generalServices)?data.generalServices: null;

        //Lấy số hiệu slide trả về, ban đầu auto là 1.
        const slide = (data.slide)?data.slide:0;

        //Từ mảng amenities và generalServices đã lấy được từ query parameter, lấy các documents cần thiết
        const amenities = await HomestaysService.getAmenitiesByID(amenitiesArray);
        const generalServices = await HomestaysService.getGeneralServiceByID(generalServicesArray);

        // Truy xuất cơ sở dữ liệu bằng filter để lấy mảng homestays
        let homestayArray = await HomestaysService.getHomestayByFilter(province, type, rate, lowPrice, highPrice, generalServices, amenities, slide);
        // Nếu thành công trả lại res 200 và toàn bộ thông tin các homestay
        return res.status(200).json({
            success: true,
            content: homestayArray
        });
    } catch (error) {
        // Nếu ko thành công -> 404
        return res.status(404).json({
            success: false,
            message: Array.isArray(error) ? error : "No homestays can be found by this filter",
            content: error
        });
    }
}
