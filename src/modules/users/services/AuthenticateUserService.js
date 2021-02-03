const HTTPStatusCode = require('http-status-codes');
const { sign } = require('jsonwebtoken');

const AppError = require('../../../shared/errors/AppError');
const authConfig = require('../../../config/auth');

class AuthenticateUserService {
  constructor({ userRepository, hashProvider }) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;

    this.execute = this.execute.bind(this);
  }

  async execute({ username, password }) {
    const user = await this.userRepository.findUserByUsername({ username });

    if (!user) {
      throw new AppError(
        'Incorrect username/password combination.',
        HTTPStatusCode.StatusCodes.UNAUTHORIZED,
      );
    }

    const passwordMatched = await this.hashProvider.compareHash({
      payload: password,
      hashed: user.password,
    });
    if (!passwordMatched) {
      throw new AppError(
        'Incorrect username/password combination.',
        HTTPStatusCode.StatusCodes.UNAUTHORIZED,
      );
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      // eslint-disable-next-line no-underscore-dangle
      subject: String(user._id),
      expiresIn,
    });

    user.password = undefined;

    return { user, token };
  }
}

module.exports = AuthenticateUserService;
