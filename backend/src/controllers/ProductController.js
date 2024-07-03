const ProductService = require('../services/ProductService');

const overview = async (req, res) => {
    try {
        const name_price_id = await ProductService.overview();
        return res.status(200).json(name_price_id);
    } catch(err) {
        return res.status(404).json({
            message: err
        });
    }
}

module.exports = {
    overview
}