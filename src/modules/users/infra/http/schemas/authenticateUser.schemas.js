const Joi = require('joi');

const authenticateUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  authenticateUserSchema,
};
