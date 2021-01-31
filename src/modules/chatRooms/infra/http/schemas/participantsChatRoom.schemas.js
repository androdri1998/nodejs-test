const Joi = require('joi');

const addParticipantChatRoomSchema = {
  params: Joi.object({
    chat_room_id: Joi.string().required(),
  }),
  body: Joi.object({
    userId: Joi.string().required(),
  }),
};

const removeParticipantChatRoomSchema = {
  params: Joi.object({
    chat_room_id: Joi.string().required(),
  }),
  body: Joi.object({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  addParticipantChatRoomSchema,
  removeParticipantChatRoomSchema,
};
