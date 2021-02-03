const { Router } = require('express');

const usersRoutes = require('../../../../modules/users/infra/http/routes/users.routes');
const ticketsRoutes = require('../../../../modules/tickets/infra/http/routes/tickets.routes');
const chatRoutes = require('../../../../modules/chats/infra/http/routes');

const routes = Router();

routes.use('/api', chatRoutes);
routes.use('/api/users', usersRoutes);
routes.use('/api/tickets', ticketsRoutes);

module.exports = routes;
