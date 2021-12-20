const express = require("express");
const AdminController = require("./super-admin.admin.controller");
const router = express.Router();
const { authToken } = require('../../../middleware/auth');

// Chức năng trả lại danh sách các bills của admin
router.put("/update/admins", authToken, AdminController.updateAdminById);
router.post("/create/admins", authToken, AdminController.createAdmin);
module.exports = router;