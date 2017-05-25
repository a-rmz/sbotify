/* @flow */

class Artist {

  name: string;
  genres: string[];
  followers: ?number;
  imageUrl: ?string;
  url: string;

  constructor(name: string, genres: string[] = [], followers: ?number, imageUrl: ?string, url: string) {
    this.name = name;
    // Uppercase the first letter
    this.genres = genres.map(genre => genre.charAt(0).toUpperCase() + genre.slice(1));
    this.followers = followers;
    this.imageUrl = imageUrl;
    this.url = url;
  }
}

module.exports = Artist;
