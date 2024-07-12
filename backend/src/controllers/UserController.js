const UserService = require('../services/UserService')

class UserController {
    info = async (req, res) => {
        try {
            const userinfo = await UserService.info(req.body.uid);
            return res.status(200).send(userinfo);  
        } catch(err) {
            return res.status(404).json({
                message: err
            });
        }
    }

    order = async (req, res) => {
        try {
            return res.status(200).send("NULL");
        } catch(err) {
            return res.status(404).json({
                message: err
            });
        }
    }
}

module.exports = new UserController