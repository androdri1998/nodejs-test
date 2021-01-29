const { hash, compare } = require('bcryptjs');

class BCryptHashProvider {
  async generateHash({ payload }) {
    return hash(payload, 8);
  }

  async compareHash({ payload, hashed }) {
    return compare(payload, hashed);
  }
}

module.exports = BCryptHashProvider;
