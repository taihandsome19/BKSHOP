const { message } = require('antd');
const ProductService = require('../services/ProductService');

class Products {
    overview = async (req, res) => {
        try {
            const overviewData = await ProductService.overview();
            // console.log(overviewData)
            return res.status(200).send(overviewData);
        } catch(err) {
            return res.status(404).json({message: err});
        }
    }

    productDetail = async (req, res) => {
        try {
            const productDetail = await ProductService.productDetail(req.query.product_id);
            // console.log(productDetail)
            return res.status(200).send(productDetail);
        } catch(err) {
            return res.status(404).json({message: err});
        }
    }

    productBrand = async (req, res) => {
        try {
            const productBrand = await ProductService.productBrand(req.query.brand);
            // console.log(productBrand)
            return res.status(200).send(productBrand);
        } catch(err) {
            return res.status(404).json({message: err});
        }
    }


}

module.exports = new Products