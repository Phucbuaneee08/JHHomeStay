var express = require('express');
var router = express.Router();

const UserController = require('../controller');
const auth = require('../../../middleware/authorization');

router.post('/login',auth.authAdmin,UserController.login);
router.post('/logout', auth.authToken,auth.authAdmin, UserController.logout);
router.post('/refresh_token', auth.authToken,auth.authAdmin, UserController.refresh_token);

module.exports = router;