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

let router: Router;
const getRouter = () => {
  if (router) {return router;}
  router = Router();
  addRoutesToRouter(router);
  return router;
};

module.exports = getRouter();
