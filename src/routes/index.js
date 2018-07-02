/* @flow */

const Router = require('express').Router;

const logger = require('../lib/logger');
const { parseIndex } = require('../lib/utils');

const addRoutesToRouter = router => {
  parseIndex(__dirname, (name: string, route: any) => {
    logger.debug(`Mounting route /${name}`);
    router.use(`/${name}`, route);
  });
};

const addRootRedirect = router => {
  if (process.env.BASE_URL) {
    router.use('/', (req, res) => {
      res.redirect(`${process.env.BASE_URL || 'localhost'}/sbotify`);
    });
  } else {
    throw new Error('Please add a base url to the .env');
  }
};

let router: Router;
const getRouter = () => {
  if (router) {return router;}
  router = Router();
  addRoutesToRouter(router);
  addRootRedirect(router);
  return router;
};

module.exports = getRouter();
