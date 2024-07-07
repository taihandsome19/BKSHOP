const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/:product_id', ProductController.productDetail);
router.get('/', ProductController.overview);

module.exports = router