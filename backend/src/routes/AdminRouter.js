const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/create_product', AdminController.createProduct);
// router.get('/manage_product', AdminController.manageproduct);
router.get('/manage_user', AdminController.manageUser);
// router.get('/manage_order', AdminController.manageorder);

module.exports = router