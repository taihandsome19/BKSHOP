const CartService = require('../services/CartService')

class CartController {
    cart = async (req, res) => {
        try {
            const result = await CartService.cart();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    addToCart = async (req, res) => {
        try {
            const result = await CartService.addToCart(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    updateQuantity = async (req, res) => {
        try {
            const result = await CartService.updateQuantity(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    remove = async (req, res) => {
        try {
            const result = await CartService.remove(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }
}

module.exports = new CartController