const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const CartController = require('../controllers/CartController');
const OrderController = require('../controllers/OrderController');

router.get('/info', UserController.info);
router.get('/notice', UserController.notification);
router.post('/notice', UserController.updateNotification);
router.post('/updateInfo', UserController.updateInfo);
router.post('/review', UserController.review);

//----------------CART--------------------------
router.get('/cart', CartController.cart);
router.post('/cart', CartController.addToCart);
router.post('/updateQuantity', CartController.updateQuantity);
router.post('/remove', CartController.remove);

//----------------ORDER-------------------------
router.get('/order', OrderController.order_overview);
router.get('/order/detail', OrderController.order_detail);
router.post('/order', OrderController.addToOrder);
router.post('/buy', OrderController.buyNow);

module.exports = router