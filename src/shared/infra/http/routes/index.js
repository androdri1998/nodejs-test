const { Router } = require('express');

const usersRoutes = require('../../../../modules/users/infra/http/routes/users.routes');
const ticketsRoutes = require('../../../../modules/tickets/infra/http/routes/tickets.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/tickets', ticketsRoutes);

module.exports = routes;
