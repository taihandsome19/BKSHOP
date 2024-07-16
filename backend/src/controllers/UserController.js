const UserService = require('../services/UserService')

class UserController {
    info = async (req, res) => {
        try {
            const userinfo = await UserService.info(req.body.uid);
            return res.status(200).send(userinfo);  
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    order = async (req, res) => {
        try {
            const result = await UserService.order();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    cart = async (req, res) => {
        try {
            const result = await UserService.cart();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    addToCart = async (req, res) => {
        try {
            const result = await UserService.addToCart(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }
}

module.exports = new UserController