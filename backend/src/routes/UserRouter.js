const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/info', UserController.info);
router.get('/order', UserController.order);
router.get('/cart', UserController.cart);
router.post('/cart', UserController.addToCart);
// router.post('/order', UserController.makeOrder);

module.exports = router