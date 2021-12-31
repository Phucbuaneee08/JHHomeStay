const express = require("express");
const HomestayController = require("./super-admin.homestays.controller");
const router = express.Router();
const { authToken } = require('../../../middleware/auth');

router.post('/create/homestays', authToken,HomestayController.createInformationForHomestay);
router.post('/getIdAdmin', authToken,HomestayController.getIdAdmin);
router.get('/homestays', authToken, HomestayController.getAllHomestays);

//Thống kê tổng doanh thu của toàn bộ homestay theo tháng trong 1 năm
router.get('/revenue/total', authToken, HomestayController.totalRevenueStatistic);
//Thống kê tổng doanh thu của 1 homestay theo từng tháng trong 1 năm
router.get('/revenue/homestay', authToken, HomestayController.revenueStatistic);

module.exports = router