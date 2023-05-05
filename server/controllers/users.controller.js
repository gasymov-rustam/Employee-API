const { sign } = require('jsonwebtoken');
const { genSalt, compare, hash } = require('bcrypt');
const { prisma } = require('../prisma/prisma');

/**
 * @route POST api/user/login
 * @desc Login user
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.SECRET_KEY;

    if (!secret) {
      return res.status(400).json({ message: 'Something went wrong' });
    }

    const token = sign({ id: user.id }, secret, { expiresIn: '1d' });

    res
      .status(200)
      .json({ message: 'Login successful', data: { id: user.id, email: user.email, name: user.name, token } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route POST api/user/register
 * @desc Register user
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existedUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existedUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    const secret = process.env.SECRET_KEY;

    if (!user || !secret) {
      return res.status(400).json({ message: 'Something went wrong' });
    }

    const token = sign({ id: user.id }, secret, { expiresIn: '1d' });

    res
      .status(200)
      .json({ message: 'Register successful', data: { id: user.id, email: user.email, name: user.name, token } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route GET api/user/current
 * @desc Get Current user
 * @access Private
 */
const current = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: 'Current user successfully fetched',
      data: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  current,
};
