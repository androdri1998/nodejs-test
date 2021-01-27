const debug = require('debug');

class DebugProvider {
  constructor(description = '') {
    this.log = debug(description);

    this.createLog = this.createLog.bind(this);
  }

  createLog({ message = '', params = {} }) {
    this.log(params, message);
  }
}

module.exports = DebugProvider;
