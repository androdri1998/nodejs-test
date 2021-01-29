class GetUserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId }) {
    const user = await this.userRepository.findUserById({
      id: userId,
    });

    user.password = undefined;

    return user;
  }
}

module.exports = GetUserService;
