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
 * @private
 * Build a Song array based on the items returned by the service
 * @method _buildSongs
 * @param  {any[]}    items The item array returned by the API
 * @return {Song[]}          The songs formatted
 */
  _buildSongs(data: any) {
    const { items } = data.body.tracks;

    return items.map(item => {
      const image = (item.album.images[0]) ? item.album.images[0].url : null;
      const name = item.name;
      const album = item.album.name;
      const artists = item.artists.map(artist => artist.name);
      const url = item.external_urls.spotify;

      return new Song(name, artists, album, image, url);
    });
  }

/**
 * @private
 * Build an Artist array based on the items returned by the service
 * @method _buildArtists
 * @param  {any[]}    data     The API response
 * @return {Artist[]}          The artists formatted
 */
  _buildArtists(data: any) {
    const { items } = data.body.artists;

    return items.map(item => {
      const image = (item.images[0]) ? item.images[0].url : null;
      const name = item.name;
      const genres = item.genres;
      const followers = item.followers.total;
      const url = item.external_urls.spotify;

      return new Artist(name, genres, followers, image, url);
    });
  }

/**
 * @private
 * Build an Album array based on the items returned by the service
 * @method _buildAlbums
 * @param  {any[]}    data     The API response
 * @return {Artist[]}          The albums formatted
 */
  _buildAlbums(data: any) {
    const { items } = data.body.albums;

    return items.map(item => {
      const image = (item.images[0]) ? item.images[0].url : null;
      const name = item.name;
      const artists = item.artists.map(artist => artist.name);
      const url = item.external_urls.spotify;

      return new Album(name, artists, image, url);
    });
  }

/**
 * Search the API by track name
 * @method searchSong
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise<[Song]>}  A promise resolving to an array of songs
 */
  searchSong(keyword: string, limit: number) {
    return this.api.searchTracks(keyword, {limit: limit})
    .then(data => this._buildSongs(data));
  }

/**
 * Search the API by artist name
 * @method searchArtist
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise<[Artist]>}  A promise resolving to an array of artists
 */
  searchArtist(keyword: string, limit: number) {
    return this.api.searchArtists(keyword, {limit: limit})
    .then(data => this._buildArtists(data));
  }

/**
 * Search the API by album name
 * @method searchAlbum
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise<[Album]>}  A promise resolving to an array of albums
 */
  searchAlbum(keyword: string, limit: number) {
    return this.api.searchAlbums(keyword, {limit: limit})
    .then(data => this._buildAlbums(data));
  }

}

module.exports = Spotify;
