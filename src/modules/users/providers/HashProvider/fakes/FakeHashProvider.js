class FakeHashProvider {
  async generateHash({ payload }) {
    return payload;
  }

  async compareHash({ payload, hashed }) {
    return payload === hashed;
  }
}

module.exports = FakeHashProvider;
