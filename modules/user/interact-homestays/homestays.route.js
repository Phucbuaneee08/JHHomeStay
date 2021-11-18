const express = require("express");
const HomestaysController = require("homestays.controller");
const router = express.Router();

// Chức năng đánh giá homestays
router.get("/ranking-homestays", HomestaysController.getRankingHomestays);
router.post("/rate-homestays/:id", HomestaysController.createRatingOfHomestay);

module.exports = router;
