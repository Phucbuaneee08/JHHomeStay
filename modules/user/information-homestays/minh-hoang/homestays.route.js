const express = require("express");
const HomestaysController = require("./homestays.controller");
const router = express.Router();

// API lấy thông tin chi tiết của homestay
router.get('/information/:id', HomestaysController.getHomestayById);
module.exports = router;