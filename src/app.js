/* @flow */

require('dotenv').load();

const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');
const slackRouter = require('./lib/slackRouter');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/', slackRouter);

app.listen(process.env.PORT || 4500, () => {
  console.log(`Sbotify server running in port ${process.env.PORT || 4500}!`);
});
