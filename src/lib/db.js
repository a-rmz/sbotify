const mysql = require('mysql2/promise');

const dbConfig = require('../config/db');
const logger = require('./logger');

const getConnection = () => {
  return mysql.createConnection(dbConfig)
    .then(connection => {
      logger.debug('Succesfully established connection to database');
      return connection;
    })
    .catch(err => {
      logger.error('Error while connecting to database', err);
    });
}

module.exports = getConnection();
