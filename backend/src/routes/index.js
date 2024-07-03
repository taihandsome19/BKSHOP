const UserRouter = require('./UserRoutes');
const AuthRouter = require('./AuthRoutes');
const ProductRouter = require('./ProductRouter');

const routes = (app) => {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/product', ProductRouter);
}

module.exports = routes;