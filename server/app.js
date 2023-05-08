require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const { logger } = require('./logger/logger');
const { errorHandler } = require('./middleware/errorHandler');

const PORT = process.env.PORT ?? 8001;

const app = express();

app.use(cors());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require('./routes/users'));
app.use('/api/employees', require('./routes/employees'));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});

module.exports = app;
