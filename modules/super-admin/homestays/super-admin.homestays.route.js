const express = require("express");
const HomestayController = require("./super-admin.homestays.controller");
const router = express.Router();

router.post('/create/homestays',HomestayController.createInformationForHomestay);
router.post('/getIdAdmin',HomestayController.getIdAdmin);
router.get('/homestays', HomestayController.getAllHomestays);
module.exports = router