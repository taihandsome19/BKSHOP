const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/detail', ProductController.productDetail);
router.get('/', ProductController.overview);

module.exports = router