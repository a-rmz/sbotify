/* @flow */

const spotifyAPI = require('../lib/spotifyAPI');

const Song = require('../schemas/Song');
const Artist = require('../schemas/Artist');
const Album = require('../schemas/Album');

class Spotify {

  // Props
  api: any

  // Methods
  constructor() {
    this.api = spotifyAPI;
  }

/**
 * Search the API by track name
 * @method _searchSong
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise<[Song]>}  A promise resolving to an array of songs
 */
  _searchSong(keyword: string, limit: number) {
    return this.api.searchTracks(keyword, {limit: limit})
    .then(data => {
      const { items } = data.body.tracks;

      return items.map(item => {
        const image = (item.album.images[0]) ? item.album.images[0].url : null;
        const album = item.album.name;
        const artists = item.artists.map(artist => artist.name);
        const url = item.external_urls.spotify;

        return new Song(item.name, artists, album, image, url);
      });
    });
  }

/**
 * Search the API by artist name
 * @method _searchArtist
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise<[Artist]>}  A promise resolving to an array of artists
 */
  _searchArtist(keyword: string, limit: number) {
    return this.api.searchArtists(keyword, {limit: limit})
    .then(data => {
      const { items } = data.body.artists;

      return items.map(item => {
        const image = (item.images[0]) ? item.images[0].url : null;
        const name = item.name;
        const genres = item.genres;
        const followers = item.followers.total;
        const url = item.external_urls.spotify;

        return new Artist(name, genres, followers, image, url);
      });
    });
  }

/**
 * Search the API by album name
 * @method _searchAlbum
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise<[Album]>}  A promise resolving to an array of albums
 */
  _searchAlbum(keyword: string, limit: number) {
    return this.api.searchAlbums(keyword, {limit: limit})
    .then(data => {
      const { items } = data.body.albums;

      return items.map(item => {
        const image = (item.images[0]) ? item.images[0].url : null;
        const name = item.name;
        const artists = item.artists.map(artist => artist.name);
        const url = item.external_urls.spotify;

        return new Album(name, artists, image, url);
      });
    });
  }

}

module.exports = Spotify;
