const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/info', UserController.info);
router.get('/order', UserController.order);

module.exports = router