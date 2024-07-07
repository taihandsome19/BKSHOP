const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/log_in', AuthController.login);
router.post('/sign_up', AuthController.createUser)
router.post('/log_out', AuthController.logout);
// router.post('/forgott_password', AuthController.forgotpassword);

module.exports = router