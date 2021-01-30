const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../../../../../config/upload');
const mongoose = require('../../../../../shared/infra/mongoose');
const TicketRepository = require('../../mongoose/respositories/TicketRepository/implementations/TicketRepository');
const TicketController = require('../controllers/TicketController');

const ensureAuthentication = require('../../../../../shared/infra/http/middlewares/ensureAuthentication');
const validateParams = require('../../../../../shared/infra/http/middlewares/validateParams');

const {
  getTicketSchema,
  storeTicketSchema,
} = require('../schemas/ticket.schemas');

const ticketsRoutes = Router();

const ticketRepository = new TicketRepository({ connection: mongoose });
const usersController = new TicketController({ ticketRepository });

const upload = multer(uploadConfig.multer);

ticketsRoutes.post(
  '/',
  [
    ensureAuthentication,
    upload.single('image'),
    validateParams({ schema: storeTicketSchema }),
  ],
  usersController.store,
);

ticketsRoutes.get(
  '/:ticket_id',
  [ensureAuthentication, validateParams({ schema: getTicketSchema })],
  usersController.get,
);

module.exports = ticketsRoutes;
