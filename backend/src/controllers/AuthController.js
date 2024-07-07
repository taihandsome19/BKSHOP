const AuthService = require('../services/AuthService')

class AuthController {
    createUser = async (req, res) => {
        try {
            await AuthService.createUser(req.body);
            // console.log(result);
            return res.status(200).send({result: "Đăng ký thành công"});
        } catch(err) {
            return res.status(404).json({result: "Email đã được đăng ký"});
        }
    }

    logout = (req, res) => {
        try {
            AuthService.logout();
            return res.status(200).send("User logouted");
        } catch(err) {
            return res.status(404).json({
                message: err
            });
        };
    }

    login = async (req, res) => {
        try {
            const userinfo = await AuthService.login(req.body);
            // console.log(req.body);
            return res.status(200).send(userinfo);
        } catch(err) {
            // return res.status(404).json({
            //     message: err
            // });
            return res.status(404).json({
                result: "Something went wrong"
            });
        };
    }
}

module.exports = new AuthController