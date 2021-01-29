const { Router } = require('express');

const mongoose = require('../../../../../shared/infra/mongoose');
const UsersController = require('../controllers/UsersController');
const AuthenticateUserController = require('../controllers/AuthenticateUserController');
const UserRepository = require('../../mongoose/repositories/UserRepository/implementations/UserRepository');

const ensureAuthentication = require('../../../../../shared/infra/http/middlewares/ensureAuthentication');
const validateParams = require('../../../../../shared/infra/http/middlewares/validateParams');

const { getUserSchema, storeUserSchema } = require('../schemas/users.schemas');
const {
  authenticateUserSchema,
} = require('../schemas/authenticateUser.schemas');

const usersRoutes = Router();
const userRepository = new UserRepository({ connection: mongoose });
const usersController = new UsersController({ userRepository });
const authenticateUserController = new AuthenticateUserController({
  userRepository,
});

usersRoutes.post(
  '/',
  validateParams({ schema: storeUserSchema }),
  usersController.store,
);
usersRoutes.get(
  '/:user_id',
  [ensureAuthentication, validateParams({ schema: getUserSchema })],
  usersController.get,
);
usersRoutes.post(
  '/auth',
  validateParams({ schema: authenticateUserSchema }),
  authenticateUserController.store,
);

module.exports = usersRoutes;
