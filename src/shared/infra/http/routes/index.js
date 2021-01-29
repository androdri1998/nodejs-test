const { Router } = require('express');

const usersRoutes = require('../../../../modules/users/infra/http/routes/users.routes');

const routes = Router();

routes.use('/users', usersRoutes);

module.exports = routes;
