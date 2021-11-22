const express = require("express");
const HomestaysController = require("./homestays.controller");
const router = express.Router();

// Chức năng đánh giá homestays
router.get("/ranking", HomestaysController.getRankingHomestays);
router.post("/rate/:id", HomestaysController.createRatingOfHomestay);
router.get("/information/:id", HomestaysController.getHomestayById);

module.exports = router;
