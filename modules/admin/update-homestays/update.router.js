const express = require("express");
const UpdateController = require("./update.controller");
const router = express.Router();
// tạo 3 router thêm sửa và xóa
router.post('/updateInformationForHomestays',UpdateController.updateInformationForHomestay);
router.post('/createInformationForHomestays',UpdateController.createInformationForHomestay);

module.exports = router