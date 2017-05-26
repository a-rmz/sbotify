/* @flow */

class Song {

  title: string;
  artists: string[];
  albumName: string;
  imageUrl: ?string;
  url: string;

  constructor(title: string, artists: string[], albumName: string, imageUrl: ?string, url: string) {
    this.title = title;
    this.artists = artists;
    this.albumName = albumName;
    this.imageUrl = imageUrl;
    this.url = url;
  }

}

module.exports = Song;
