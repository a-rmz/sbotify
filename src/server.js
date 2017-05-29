/* @flow */

require('dotenv').load();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const routes = require('./routes');

const spotifyAPI = require('./lib/spotifyAPI');
spotifyAPI.setRefreshTokenService();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  logger.debug(req.url);
  next();
});

app.use('/', routes);

app.listen(process.env.PORT || 4500, () => {
  logger.debug(`Sbotify server running in port ${process.env.PORT || 4500}!`);
});
