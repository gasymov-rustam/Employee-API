const { logger } = require('../logger/logger');

const HttpStatusCode = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
});

const createError = ({ error, statusCode, message }) => {
  error.statusCode = statusCode ? statusCode : error.statusCode ?? HttpStatusCode.INTERNAL_SERVER;
  error.message = message ? message : error.message ?? 'Internal Server Error';
  error.stack = error.stack ?? '';

  return error;
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message, error);

  const statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER;
  const message = error.message || 'Internal Server Error';
  const stack = error.stack || '';

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      stack,
    },
  });

  next();
};

module.exports = { errorHandler, createError, HttpStatusCode };
