const { Router } = require('express');

const mongoose = require('mongoose');
const ChatRoomsRepository = require('../../mongoose/repositories/ChatRoomsRepository/implementations/ChatRoomsRepository');
const MessagesController = require('../controllers/MessagesController');

const ensureAuthentication = require('../../../../../shared/infra/http/middlewares/ensureAuthentication');
const validateParams = require('../../../../../shared/infra/http/middlewares/validateParams');

const { listMessagesChatRoomSchema } = require('../schemas/messages.schemas');

const chatRoomsRoutes = Router();

const chatRoomsRepository = new ChatRoomsRepository({ connection: mongoose });
const messagesController = new MessagesController({
  chatRoomsRepository,
});

chatRoomsRoutes.get(
  '/chatmessages/:ticketId',
  [
    ensureAuthentication,
    validateParams({ schema: listMessagesChatRoomSchema }),
  ],
  messagesController.index,
);

module.exports = chatRoomsRoutes;
