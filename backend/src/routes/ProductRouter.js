const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.overview);
// router.get('/:product_id', ProductController.productDetail);
module.exports = router