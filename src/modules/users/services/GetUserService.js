const HTTPStatusCodes = require('http-status-codes');
const AppError = require('../../../shared/errors/AppError');

class GetUserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId }) {
    const user = await this.userRepository.findUserById({
      id: userId,
    });

    if (!user) {
      throw new AppError(
        'User not found',
        HTTPStatusCodes.StatusCodes.NOT_FOUND,
      );
    }

    user.password = undefined;

    return user;
  }
}

module.exports = GetUserService;
