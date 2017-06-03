/* @flow */

const logger = require('../lib/logger');
const { flattenArray } = require('../lib/utils');

const services: {} = require('../services');
const Artist = require('../schemas/Artist');

class ArtistSearch {
  name: string
  limit: number
  _result: Promise<Artist[]>;

  constructor(name: string, limit: number)  {
    this.name = name;
    this.limit = limit;
  }

  search(): void {
    this._result = this._getArtists();
  }

  getResults(): Promise<Artist[]> {
    return this._result;
  }

  _getArtists(): Promise<Artist[]> {
    let promises: Promise<Artist[]>[] = [];

    for (const service: string in services) {
      const currentService = services[service];
      promises.push(currentService._searchArtist(this.name, this.limit));
    }

    return Promise.all(promises)
      .then(result => flattenArray(result))
      .catch(reason => {
        logger.error(reason);
        return [];
      });
  }
}

module.exports = ArtistSearch;
