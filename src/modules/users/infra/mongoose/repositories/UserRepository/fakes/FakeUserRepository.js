const { v4: uuidV4 } = require('uuid');

class FakeUserRepository {
  constructor({ connection }) {
    this.connection = connection;

    this.users = [];
  }

  createUser({ username, password, profile }) {
    const user = {
      _id: uuidV4(),
      username,
      password,
      profile,
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    return user;
  }

  async saveUser({ user }) {
    this.users.push(user);
    return user;
  }

  async findUserById({ id }) {
    // eslint-disable-next-line no-underscore-dangle
    const user = this.users.find(userFind => userFind._id === id);
    return user;
  }

  async findUserByUsername({ username }) {
    const user = this.users.find(userFind => userFind.username === username);
    return user;
  }
}

module.exports = FakeUserRepository;
