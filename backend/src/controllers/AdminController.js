const AdminService = require('../services/AdminService')

class AdminController {
    createProduct = async (req, res) => {
        try {
            const result = await AdminService.createProduct(req.body);
            // console.log(result);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    manageUser = async (req, res) => {
        try {
            const result = await AdminService.manageUser();
            // console.log(result);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    manageOrder = async (req, res) => {
        try {
            const result = await AdminService.manageOrder();
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    manageProduct = async (req, res) => {
        try {
            const result = await AdminService.manageProduct();
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    updateOrder = async (req, res) => {
        try {
            const result = await AdminService.updateOrder(req.body);
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    updateProduct = async (req, res) => {
        try {
            const result = await AdminService.updateProduct(req.body);
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    updatePayment = async (req, res) => {
        try {
            const result = await AdminService.updatePayment(req.body);
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    removeProduct = async (req, res) => {
        try {
            const result = await AdminService.removeProduct(req.body);
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    banUser = async (req, res) => {
        try {
            const result = await AdminService.banUser(req.body);
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    add_notification = async (req, res) => {
        try {
            const result = await AdminService.add_notification(req.body);
            // console.log(result);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    report = async (req, res) => {
        try {
            const user = await AdminService.countUser();
            const order = await AdminService.countOrder();
            const result = {
                status: true,
                result: {
                    total_of_user: parseInt(user),
                    total_of_order: order.order,
                    total_of_delivery: order.delivery,
                    total_of_revenue: order.revenue
                }
            }
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }
}

module.exports = new AdminController