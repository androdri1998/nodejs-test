const User = require('../../../models/User');

class UserRepository {
  constructor({ connection }) {
    this.connection = connection;
  }

  createUser({ username, password, profile }) {
    const user = new User({ username, password, profile });
    return user;
  }

  async saveUser({ user }) {
    await user.save();
    return user;
  }

  async findUserById({ id }) {
    const user = await User.findById(id);
    return user;
  }

  async findUserByUsername({ username }) {
    const user = await User.findOne({ username });
    return user;
  }
}

module.exports = UserRepository;
