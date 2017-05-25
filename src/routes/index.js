/* @flow */

const router = require('express').Router();
const expressListRoutes = require('express-list-routes');

// Load all the routes
require('fs').readdirSync(__dirname + '/').forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name: string = file.replace('.js', '');
    const path: string = `./${file}`;
    const route = require(path);

    router.use(`/${name}`, route);
  }
});

module.exports = router;
