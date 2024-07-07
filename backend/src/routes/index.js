const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const ProductRouter = require('./ProductRouter');

const routes = (app) => {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/product', ProductRouter);
    app.use('/home', ProductRouter);
}

module.exports = routes;