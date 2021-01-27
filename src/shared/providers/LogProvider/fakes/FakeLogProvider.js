/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
class FakeLogProvider {
  constructor(description = '') {}

  createLog({ message = '', params = {} }) {}
}

module.exports = FakeLogProvider;
