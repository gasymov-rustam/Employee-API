const express = require('express');
const router = express.Router();
const { login, register, current } = require('../controllers/users.controller');
const { checkAuth } = require('../middleware/checkAuth.middleware');

router.post('/login', login);
router.post('/register', register);
router.get('/current', checkAuth, current);

module.exports = router;
