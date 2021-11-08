var express = require('express');
var router = express.Router();
const UserController = require('../controller');
const auth = require('../../../middleware/authorization');

router.post('/login',auth.authSuperAdmin, UserController.login);
router.post('/logout',auth.authToken, auth.authSuperAdmin, UserController.logout);
router.post('/refresh_token',auth.authToken, auth.authSuperAdmin, UserController.refresh_token);

module.exports = router;