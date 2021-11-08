const express = require("express");
const router = express.Router();
const AuthController  = require('./auth.controller');
const { authToken, authAdmin, authSuperAdmin } = require('../../middleware');

// Các api xác thực người dùng
router.post("/login-admin", authAdmin,AuthController.login);
router.post("/login-super-admin", authSuperAdmin, AuthController.login);
router.post("/logout", authToken, AuthController.logout);

module.exports = router;
