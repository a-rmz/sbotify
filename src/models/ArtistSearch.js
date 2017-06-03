/* @flow */

const services: {} = require('../services');

const Search = require('./Search');
const Artist = require('../schemas/Artist');

class ArtistSearch extends Search {

  search(): Promise<Artist[]> {
    let promises: Promise<Artist[]>[] = [];

    for (const service: string in services) {
      const currentService = services[service];
      promises.push(currentService._searchArtist(this.term, this.limit));
    }

    this._result = this.setResult(promises);

    return this._result;
  }

}

module.exports = ArtistSearch;
