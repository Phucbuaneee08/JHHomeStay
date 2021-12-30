const express = require("express");
const HomestayController = require("./super-admin.homestays.controller");
const router = express.Router();

router.post('/create/homestays',HomestayController.createInformationForHomestay);
router.post('/getIdAdmin',HomestayController.getIdAdmin);
router.get('/homestays', HomestayController.getAllHomestays);

//Thống kê tổng doanh thu của toàn bộ homestay theo tháng trong 1 năm
router.get('/revenue/total/:year',HomestayController.totalRevenueStatistic);
//Thống kê tổng doanh thu của 1 homestay theo từng tháng trong 1 năm
router.get('/revenue/homestay',HomestayController.revenueStatistic);

module.exports = router