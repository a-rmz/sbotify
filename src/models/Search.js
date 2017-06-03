/* @flow */

const logger = require('../lib/logger');
const { flattenArray } = require('../lib/utils');

class Search {
  term: string;
  _result: Promise<*[]>;
  limit: number;

  constructor(term: string, limit: number)  {
    this.term = term;
    this.limit = limit;
  }

  getResults(): Promise<*[]> {
    return this._result;
  }

  setResult(promises: Promise<*[]>[]): Promise<*[]> {
    return Promise.all(promises)
      .then(result => flattenArray(result))
      .catch(reason => {
        logger.error(reason);
        return [];
      });
  }
}

module.exports = Search;
