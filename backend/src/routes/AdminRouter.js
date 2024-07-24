const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/create_product', AdminController.createProduct);
router.get('/manage_product', AdminController.manageProduct);
router.get('/manage_user', AdminController.manageUser);
router.get('/manage_order', AdminController.manageOrder);
router.post('update_order', AdminController.updateOrder);
router.post('/update_product', AdminController.updateProduct);

module.exports = router