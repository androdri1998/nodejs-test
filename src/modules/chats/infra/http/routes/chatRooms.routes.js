const { Router } = require('express');

const mongoose = require('mongoose');
const ChatRoomsRepository = require('../../mongoose/repositories/ChatRoomsRepository/implementations/ChatRoomsRepository');
const TicketRepository = require('../../../../tickets/infra/mongoose/respositories/TicketRepository/implementations/TicketRepository');
const UserRepository = require('../../../../users/infra/mongoose/repositories/UserRepository/implementations/UserRepository');
const ChatRoomsController = require('../controllers/ChatRoomsController');
const CounterUnreadMessagesChatRoomController = require('../controllers/CounterUnreadMessagesChatRoomController');
const CounterChatRoomsWithUnreadMessagesController = require('../controllers/CounterChatRoomsWithUnreadMessagesController');

const ensureAuthentication = require('../../../../../shared/infra/http/middlewares/ensureAuthentication');
const validateParams = require('../../../../../shared/infra/http/middlewares/validateParams');

const {
  listChatRoomSchema,
  storeChatRoomSchema,
  chatRoomsWithUnreadMessagesSchema,
  unreadMessagesChatRoomSchema,
} = require('../schemas/chatRooms.schemas');

const chatRoomsRoutes = Router();

const chatRoomsRepository = new ChatRoomsRepository({ connection: mongoose });
const ticketRepository = new TicketRepository({ connection: mongoose });
const userRepository = new UserRepository({ connection: mongoose });
const chatRoomsController = new ChatRoomsController({
  chatRoomsRepository,
  ticketRepository,
  userRepository,
});
const counterUnreadMessagesChatRoomController = new CounterUnreadMessagesChatRoomController(
  {
    chatRoomsRepository,
  },
);
const counterChatRoomsWithUnreadMessagesController = new CounterChatRoomsWithUnreadMessagesController(
  {
    chatRoomsRepository,
    userRepository,
  },
);

chatRoomsRoutes.post(
  '/createchatroom',
  [ensureAuthentication, validateParams({ schema: storeChatRoomSchema })],
  chatRoomsController.store,
);

chatRoomsRoutes.get(
  '/chatroomsbyuser',
  [ensureAuthentication, validateParams({ schema: listChatRoomSchema })],
  chatRoomsController.index,
);

chatRoomsRoutes.get(
  '/chat-rooms/unread-messages',
  [
    ensureAuthentication,
    validateParams({ schema: chatRoomsWithUnreadMessagesSchema }),
  ],
  counterChatRoomsWithUnreadMessagesController.index,
);

chatRoomsRoutes.get(
  '/chat-rooms/:chat_room_id/unread-messages',
  [
    ensureAuthentication,
    validateParams({ schema: unreadMessagesChatRoomSchema }),
  ],
  counterUnreadMessagesChatRoomController.index,
);

module.exports = chatRoomsRoutes;
