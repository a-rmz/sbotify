/* @flow */

class Album {

  name: string;
  artists: string[];
  imageUrl: ?string;
  url: string;

  constructor(name: string, artists: string[], imageUrl: ?string, url: string) {
    this.name = name;
    this.artists = artists;
    this.imageUrl = imageUrl;
    this.url = url;
  }
}

module.exports = Album;
