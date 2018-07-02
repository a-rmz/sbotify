// @flow

const songResponse = require('./songResponse');
const artistResponse = require('./artistResponse');
const albumResponse = require('./albumResponse');

class SpotifyMock {

  clientId: string;
  clientSecret: string;
  token: string;

  constructor(options: Object) {
    this.clientId = options.clientId || '';
    this.clientSecret = options.clientSecret || '';
  }

  clientCredentialsGrant(): Promise<Object> {
    return Promise.resolve({
      body: {
        access_token: 'xoxo-access-token',
      },
    });
  }

  setAccessToken(token: string): void {
    this.token = token;
  }

  searchTracks(keyword: string, options: {}): Promise<Object> {
    return new Promise((resolve, reject) => {
      resolve(songResponse);
    });
  }

  searchArtists(keyword: string, options: {}): Promise<Object> {
    return new Promise((resolve, reject) => {
      resolve(artistResponse);
    });
  }

  searchAlbums(keyword: string, options: {}): Promise<Object> {
    return new Promise((resolve, reject) => {
      resolve(albumResponse);
    });
  }
}

module.exports = SpotifyMock;
