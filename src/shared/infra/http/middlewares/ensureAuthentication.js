const HTTPStatusCodes = require('http-status-codes');
const { verify } = require('jsonwebtoken');

const authConfig = require('../../../../config/auth');
const AppError = require('../../../errors/AppError');

const ensureAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      'JWT token is missing',
      HTTPStatusCodes.StatusCodes.UNAUTHORIZED,
    );
  }

  const [scheme, token] = authHeader.split(' ');

  if (!scheme || scheme !== 'Bearer') {
    throw new AppError(
      'Token malformatted',
      HTTPStatusCodes.StatusCodes.UNAUTHORIZED,
    );
  }

  if (!token) {
    throw new AppError(
      'JWT token is missing',
      HTTPStatusCodes.StatusCodes.UNAUTHORIZED,
    );
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    // eslint-disable-next-line no-unused-vars
    const { exp, iat, sub } = decoded;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError(
      'Invalid JWT token',
      HTTPStatusCodes.StatusCodes.UNAUTHORIZED,
    );
  }
};

module.exports = ensureAuthentication;
