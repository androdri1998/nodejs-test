const HTTPStatusCode = require('http-status-codes');

const BCryptHashProvider = require('../../../providers/HashProvider/implementations/BCryptHashProvider');
const AuthenticateUserService = require('../../../services/AuthenticateUserService');

class AuthenticateUserController {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

    this.store = this.store.bind(this);
  }

  async store(req, res) {
    const { username, password } = req.body;

    const bCryptHashProvider = new BCryptHashProvider();
    const authenticateUserService = new AuthenticateUserService({
      userRepository: this.userRepository,
      hashProvider: bCryptHashProvider,
    });

    const response = await authenticateUserService.execute({
      username,
      password,
    });

    return res.status(HTTPStatusCode.StatusCodes.OK).json(response);
  }
}

module.exports = AuthenticateUserController;
