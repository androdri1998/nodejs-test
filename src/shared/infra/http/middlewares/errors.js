const HTTPStatusCode = require('http-status-codes');
const AppError = require('../../../errors/AppError');
const DebugProvider = require('../../../providers/LogProvider/implementations/DebugProvider');

// eslint-disable-next-line no-unused-vars
const errorsMiddleware = (err, req, res, _) => {
  const debugProvider = new DebugProvider('api:log:error');

  if (
    err instanceof AppError &&
    err.statusCode < HTTPStatusCode.StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }

  debugProvider.createLog(err);

  const statusCode =
    err.statusCode || HTTPStatusCode.StatusCodes.INTERNAL_SERVER_ERROR;

  return res
    .status(statusCode)
    .json({ status: 'error', error: 'Internal server error' });
};

module.exports = errorsMiddleware;
