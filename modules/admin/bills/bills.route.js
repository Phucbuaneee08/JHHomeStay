
const express = require("express");
const BillsController = require("./bills.controller");
const router = express.Router();
const { authToken } = require('../../../middleware/auth');

// Chức năng trả lại danh sách các bills của admin
router.get("/bills-of-admin/:id", authToken, BillsController.getBillsByAdminId);
module.exports = router;