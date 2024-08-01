const OrderService = require('../services/OrderService')

class OrderController {
    order_overview = async (req, res) => {
        try {
            const result = await OrderService.order_overview();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    order_detail = async (req, res) => {
        try {
            const result = await OrderService.order_detail(req.query.orderId);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    addToOrder = async (req, res) => {
        try {
            const result = await OrderService.addToOrder(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    buyNow = async (req, res) => {
        try {
            const result = await OrderService.buyNow(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new OrderController