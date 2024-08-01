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

    updateInfo = async (req, res) => {
        try {
            const result = await UserService.updateInfo(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    notification = async (req, res) => {
        try {
            const result = await UserService.notification();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    updateNotification = async (req, res) => {
        try {
            const result = await UserService.updateNotification(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    review = async (req, res) => {
        try {
            const result = await UserService.review(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new UserController