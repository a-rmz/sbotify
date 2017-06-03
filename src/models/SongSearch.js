/* @flow */

const logger = require('../lib/logger');
const { flattenArray } = require('../lib/utils');

const services: {} = require('../services');
const Song = require('../schemas/Song');

class SongSearch {
  name: string
  limit: number
  _result: Promise<Song[]>;

  constructor(name: string, limit: number)  {
    this.name = name;
    this.limit = limit;
  }

  search(): void {
    this._result = this._getSongs();
  }

  getResults(): Promise<Song[]> {
    return this._result;
  }

  _getSongs(): Promise<Song[]> {
    let promises: Promise<Song[]>[] = [];

    for (const service: string in services) {
      const currentService = services[service];
      promises.push(currentService._searchSong(this.name, this.limit));
    }

    return Promise.all(promises)
      .then(result => flattenArray(result))
      .catch(reason => {
        logger.error(reason);
        return [];
      });
  }
}

module.exports = SongSearch;
