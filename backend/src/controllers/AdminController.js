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

}

module.exports = new AdminController