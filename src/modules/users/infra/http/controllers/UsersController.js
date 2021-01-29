const HTTPStatusCode = require('http-status-codes');

const BCryptHashProvider = require('../../../providers/HashProvider/implementations/BCryptHashProvider');
const CreateUserService = require('../../../services/CreateUserService');
const GetUserService = require('../../../services/GetUserService');

class UsersController {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

    this.get = this.get.bind(this);
    this.store = this.store.bind(this);
  }

  async get(req, res) {
    const { user_id: userId } = req.params;

    const getUserService = new GetUserService({
      userRepository: this.userRepository,
    });

    const response = await getUserService.execute({ userId });

    return res.status(HTTPStatusCode.StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const { username, password, profile } = req.body;

    const bCryptHashProvider = new BCryptHashProvider();
    const createUserService = new CreateUserService({
      userRepository: this.userRepository,
      hashProvider: bCryptHashProvider,
    });

    const response = await createUserService.execute({
      username,
      password,
      profile,
    });

    return res.status(HTTPStatusCode.StatusCodes.CREATED).json(response);
  }
}

module.exports = UsersController;
