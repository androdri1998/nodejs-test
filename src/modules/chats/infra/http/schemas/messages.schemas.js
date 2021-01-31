const Joi = require('joi');

const listMessagesChatRoomSchema = {
  params: Joi.object({
    ticketId: Joi.string().required(),
  }),
};

module.exports = {
  listMessagesChatRoomSchema,
};
