const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const CartController = require('../controllers/CartController');

router.get('/info', UserController.info);
router.get('/order', UserController.order_overview);
router.get('/order/detail', UserController.order_detail);
router.post('/updateInfo', UserController.updateInfo);
router.post('/order', UserController.addToOrder);
router.get('/notice', UserController.notification);
router.post('/notice', UserController.updateNotification);
//------------------------------------------
router.get('/cart', CartController.cart);
router.post('/cart', CartController.addToCart);
router.post('/updateQuantity', CartController.updateQuantity);
router.post('/remove', CartController.remove);

// router.post('/order', UserController.makeOrder);

module.exports = router