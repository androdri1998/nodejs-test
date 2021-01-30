const Joi = require('joi');

const getTicketSchema = {
  params: Joi.object({
    ticket_id: Joi.string().required(),
  }),
};

const storeTicketSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

module.exports = {
  getTicketSchema,
  storeTicketSchema,
};
