const express = require("express");
const UpdateController = require("./admin.homestays.controller");
const router = express.Router();

router.put('/update/homestays',UpdateController.updateHomestay);

module.exports = router