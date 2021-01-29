const Joi = require('joi');

const getUserSchema = {
  params: Joi.object({
    user_id: Joi.string().required(),
  }),
};

const storeUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    profile: Joi.string().valid('admin', 'normal').required(),
  }),
};

module.exports = {
  getUserSchema,
  storeUserSchema,
};
