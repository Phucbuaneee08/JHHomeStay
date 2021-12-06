const express = require("express");
const UpdateController = require("./admin.homestays.controller");
const router = express.Router();
// tạo 3 router thêm sửa và xóa
router.put('/update/homestays',UpdateController.updateInformationForHomestay);
router.post('/create/homestays',UpdateController.createInformationForHomestay);

module.exports = router