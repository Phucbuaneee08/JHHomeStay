const express = require("express");
const UpdateController = require("./update.controller");
const router = express.Router();
// tạo 3 router thêm sửa và xóa
router.post('/updateHomestays',UpdateController.updateHomestay);
router.post('/deleteInformationInHomestays',UpdateController.deleteInformationInHomestay);
router.post('/createInformationForHomestays',UpdateController.createInformationforHomestays);

module.exports = router