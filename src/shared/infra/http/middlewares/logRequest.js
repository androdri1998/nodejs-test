const DebugProvider = require('../../../providers/LogProvider/implementations/DebugProvider');

const logRequest = (req, res, next) => {
  const debugProvider = new DebugProvider('api:log:request');
  const { body, query, method, headers, originalUrl } = req;

  debugProvider.createLog({
    params: {
      body,
      query,
      method,
      headers,
      originalUrl,
      date: new Date().toISOString(),
    },
    message: 'REQUEST',
  });

  next();
};

module.exports = logRequest;
