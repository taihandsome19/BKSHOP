const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const ProductRouter = require('./ProductRouter');
const AdminRouter = require('./AdminRouter');
const UploadRouter = require('./UploadRouter');

const routes = (app) => {
    app.use('/user', UserRouter);
    app.use('/auth', AuthRouter);
    app.use('/product', ProductRouter);
    app.use('/home', ProductRouter);
    app.use('/admin', AdminRouter);
    app.use('/upload', UploadRouter);
}

module.exports = routes;