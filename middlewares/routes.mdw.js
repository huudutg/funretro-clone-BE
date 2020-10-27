
module.exports = function (app) {
    app.use('/dashboard', require('../routes/Dashboard/dashboard.route'));
    app.use('/user', require('../routes/User/user.route'));
    //     app.use('/host',require('../routes/user/host.route'));
    //     app.use('/room', require('../routes/room/room.route'));
    //     app.use('/admin', require('../routes/admin/admin.route'));
};