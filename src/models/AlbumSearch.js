/* @flow */

const services: {} = require('../services');

const Search = require('./Search');
const Album = require('../schemas/Album');

class AlbumSearch extends Search {

  search(): Promise<Album[]> {
    let promises: Promise<Album[]>[] = [];

    for (const service: string in services) {
      const currentService = services[service];
      promises.push(currentService.searchAlbum(this.term, this.limit));
    }

    this._result = this.setResult(promises);

    return this._result;
  }

}

module.exports = AlbumSearch;
