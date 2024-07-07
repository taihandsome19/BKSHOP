const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/signup', AuthController.createUser)
router.post('/logout', AuthController.logout);
// router.post('/resetpassword', AuthController.resetpassword);

module.exports = router