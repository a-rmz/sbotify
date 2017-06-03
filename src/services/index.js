/* @flow */

const logger = require('../lib/logger');
const { parseIndex } = require('../lib/utils');

const loadServices = () => {
  parseIndex(__dirname, (name: string, Service: any) => {
    logger.debug(`Mounting service ${name}`);
    module.exports[name] = new Service();
  });
};

loadServices();
