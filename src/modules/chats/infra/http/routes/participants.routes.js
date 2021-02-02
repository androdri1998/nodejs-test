const { Router } = require('express');

const mongoose = require('mongoose');
const ChatRoomsRepository = require('../../mongoose/repositories/ChatRoomsRepository/implementations/ChatRoomsRepository');
const UserRepository = require('../../../../users/infra/mongoose/repositories/UserRepository/implementations/UserRepository');
const ParticipantsChatRoomsController = require('../controllers/ParticipantsChatRoomsController');

const ensureAuthentication = require('../../../../../shared/infra/http/middlewares/ensureAuthentication');
const validateParams = require('../../../../../shared/infra/http/middlewares/validateParams');

const {
  addParticipantChatRoomSchema,
  listParticipantChatRoomSchema,
} = require('../schemas/participantsChatRoom.schemas');

const participantsRoutes = Router();

const chatRoomsRepository = new ChatRoomsRepository({ connection: mongoose });
const userRepository = new UserRepository({ connection: mongoose });
const participantsChatRoomsController = new ParticipantsChatRoomsController({
  chatRoomsRepository,
  userRepository,
});

participantsRoutes.get(
  '/chat-room/:chat_room_id/participants',
  [
    ensureAuthentication,
    validateParams({ schema: listParticipantChatRoomSchema }),
  ],
  participantsChatRoomsController.index,
);

participantsRoutes.post(
  '/chat-room/:chat_room_id/participants',
  [
    ensureAuthentication,
    validateParams({ schema: addParticipantChatRoomSchema }),
  ],
  participantsChatRoomsController.store,
);

module.exports = participantsRoutes;
