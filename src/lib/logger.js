
const winston = require('winston');
const config = require('../config/logger');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(config.console),
    new (winston.transports.File)(config.file)
  ]
});

module.exports = logger;
