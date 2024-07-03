const UserService = require('../services/UserService')
const createUser = (req, res) => {
    try {
        console.log(req.body);

    } catch(err) {
        return res.status(404).json({
            message: err
        });
    }
}

module.exports = {
    createUser
}