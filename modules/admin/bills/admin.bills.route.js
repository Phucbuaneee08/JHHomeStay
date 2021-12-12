
const express = require("express");
const BillsController = require("./admin.bills.controller");
const router = express.Router();
const { authToken } = require('../../../middleware/auth');

// Chức năng trả lại danh sách các bills của admin
router.get("/bills-of-admin/:id", BillsController.getBillsByAdminId);
router.put("/update/bills", BillsController.updateBillsById)
router.post("/delete/bills",authToken, BillsController.deleteBillsById);

module.exports = router;