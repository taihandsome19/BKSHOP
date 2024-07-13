const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/log_in', AuthController.login);
router.post('/sign_up', AuthController.createUser)
router.post('/log_out', AuthController.logout);
router.post('/forgot_password', AuthController.forgotPassword);
router.post('/change_passwrod', AuthController.changePassword);

module.exports = router