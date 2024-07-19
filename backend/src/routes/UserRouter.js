const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/info', UserController.info);
router.get('/order', UserController.order);
router.get('/cart', UserController.cart);
router.post('/cart', UserController.addToCart);
router.post('/increase', UserController.increaseQuantity);
router.post('/decrease', UserController.decreaseQuantity);
router.post('/remove', UserController.remove);
router.post('/updateInfo', UserController.updateInfo);

// router.post('/order', UserController.makeOrder);

module.exports = router