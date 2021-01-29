class CreateUserService {
  constructor({ userRepository, hashProvider }) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;

    this.execute = this.execute.bind(this);
  }

  async execute({ username, password, profile }) {
    const hash = await this.hashProvider.generateHash({ payload: password });

    let user = this.userRepository.createUser({
      username,
      password: hash,
      profile,
    });

    user = await this.userRepository.saveUser({ user });
    return user;
  }
}

module.exports = CreateUserService;
