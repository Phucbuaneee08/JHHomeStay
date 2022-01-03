const express = require("express");
const AdminController = require("./super-admin.admin.controller");
const router = express.Router();
const { authToken } = require('../../../middleware');

router.put("/update/admins", authToken, AdminController.updateAdminById);
router.post("/create/admins", authToken, AdminController.createAdmin);
router.post("/assign-homestay", authToken, AdminController.assignAdminToHomestay);
router.delete("/delete/admin/:id", authToken, AdminController.deleteAdmin);
router.delete("/delete/homestay/:id", authToken, AdminController.deleteHomestay);
router.get("/get/admins", authToken, AdminController.getAdmins);

module.exports = router;