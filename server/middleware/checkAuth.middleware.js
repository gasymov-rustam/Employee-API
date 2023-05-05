const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma');

const checkAuth = async (req, res, next) => {
  try {
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      return res.status(400).json({ message: 'Something went wrong' });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(400).json({ message: 'Invalid token' });

    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkAuth };
