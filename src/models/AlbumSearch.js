/* @flow */

const services: {} = require('../services');
const Album = require('../schemas/Album');

class AlbumSearch {
  name: string
  limit: number
  _result: Promise<Album[]>;

  constructor(name: string, limit: number)  {
    this.name = name;
    this.limit = limit;
  }

  search(): void {
    this._result = this._getAlbums();
  }

  getResults(): Promise<Album[]> {
    return this._result;
  }

  _getAlbums(): Promise<Album[]> {
    let promises: Promise<Album[]>[] = [];

    for (const service: string in services) {
      const currentService = new services[service]();
      promises.push(currentService._searchAlbum(this.name, this.limit));
    }

    return Promise.all(promises)
      .then(result => [].concat.apply([], result))
      .catch(reason => {
        console.log(reason);
        return [];
      });
  }
}

module.exports = AlbumSearch;
