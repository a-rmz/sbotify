/* @flow */

const services: {} = require('../services');

const Search = require('./Search');
const Song = require('../schemas/Song');

class SongSearch extends Search {

  search(): Promise<Song[]> {
    let promises: Promise<Song[]>[] = [];

    for (const service: string in services) {
      const currentService = services[service];
      promises.push(currentService.searchSong(this.term, this.limit));
    }

    this._result = this.setResult(promises);

    return this._result;
  }

}

module.exports = SongSearch;
