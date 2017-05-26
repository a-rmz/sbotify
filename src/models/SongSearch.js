/* @flow */

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
      const currentService = new services[service]();
      promises.push(currentService._searchSong(this.name, this.limit));
    }

    return Promise.all(promises)
      .then(result => [].concat.apply([], result))
      .catch(reason => {
        console.log(reason);
        return [];
      });
  }
}

module.exports = SongSearch;
