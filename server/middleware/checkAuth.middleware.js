const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma');
const { createError, HttpStatusCode } = require('./errorHandler');

const checkAuth = async (req, res, next) => {
  try {
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      const error = new Error();
      return next(createError({ error, message: 'Something went wrong', HTTPStatusCode: HttpStatusCode.BAD_REQUEST }));
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      const error = new Error();
      return next(createError({ error, message: 'Invalid token', HTTPStatusCode: HttpStatusCode.UNAUTHORIZED }));
    }

    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      const error = new Error();
      return next(createError({ error, message: 'Invalid token', HTTPStatusCode: HttpStatusCode.UNAUTHORIZED }));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      const error = new Error();
      return next(createError({ error, message: 'User not authorized', HTTPStatusCode: HttpStatusCode.FORBIDDEN }));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createError({ error, message: 'Something went wrong', HTTPStatusCode: HttpStatusCode.INTERNAL_SERVER }));
  }
};

module.exports = { checkAuth };
