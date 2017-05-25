/* @flow */

require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/', routes);

app.listen(process.env.PORT || 4500, () => {
  console.log(`Sbotify server running in port ${process.env.PORT || 4500}!`);
});
