const express = require("express");
const HomestayController = require("./super-admin.homestays.controller");
const router = express.Router();

router.post('/create/homestays',HomestayController.createInformationForHomestay);
router.post('/homestays', HomestayController.getAllHomestays);
module.exports = router