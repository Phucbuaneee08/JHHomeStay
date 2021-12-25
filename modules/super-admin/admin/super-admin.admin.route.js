const express = require("express");
const AdminController = require("./super-admin.admin.controller");
const router = express.Router();
const { authToken } = require('../../../middleware/auth');

// Chức năng trả lại danh sách các bills của admin
router.put("/update/admins", authToken, AdminController.updateAdminById);
router.post("/create/admins", authToken, AdminController.createAdmin);

// Cắt và ghép vào main từ phần này,
router.post("/assign-homestay", authToken, AdminController.assignAdminToHomestay);
router.delete("/delete/admin/:id", authToken, AdminController.deleteAdmin);
router.delete("/delete/homestay/:id", authToken, AdminController.deleteHomestay);
module.exports = router;