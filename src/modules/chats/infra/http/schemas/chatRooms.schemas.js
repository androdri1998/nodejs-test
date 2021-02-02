const Joi = require('joi');

const listChatRoomSchema = {
  query: Joi.object({
    userId: Joi.string().required(),
    limit: Joi.number().integer().default(10),
    offset: Joi.number().integer().default(0),
    term: Joi.string(),
  }),
};

const storeChatRoomSchema = {
  body: Joi.object({
    ticket_id: Joi.string().required(),
    description: Joi.string().required(),
    permalink: Joi.string().required(),
    permission: Joi.string().valid('admin', 'normal').required(),
    participants: Joi.array()
      .items(Joi.object({ userId: Joi.string().required() }))
      .default([]),
  }),
};

const chatRoomsWithNonReadMessagesSchema = {
  user: Joi.object({
    id: Joi.string().required(),
  }),
};

const nonReadMessagesChatRoomSchema = {
  params: Joi.object({
    chat_room_id: Joi.string().required(),
  }),
};

module.exports = {
  storeChatRoomSchema,
  listChatRoomSchema,
  chatRoomsWithNonReadMessagesSchema,
  nonReadMessagesChatRoomSchema,
};
