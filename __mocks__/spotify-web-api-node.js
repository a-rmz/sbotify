
const spotifyWebApiMock = jest.genMockFromModule('spotify-web-api-node');
const songResponse = require('./songResponse');
const artistResponse = require('./artistResponse');
const albumResponse = require('./albumResponse');

class SpotifyMock {

  constructor(options) {
    this.clientId = options.clientId || '';
    this.clientSecret = options.clientSecret || '';
  }

  clientCredentialsGrant() {
    return Promise.resolve({
      body: {
        access_token: 'xoxo-access-token',
      },
    })
  }

  setAccessToken(token: String) {
    this.token = token;
  }

  searchTracks(keyword: String, options: {}) {
    return new Promise((resolve, reject) => {
      resolve(songResponse);
    });
  }

  searchArtists(keyword: String, options: {}) {
    return new Promise((resolve, reject) => {
      resolve(artistResponse);
    });
  }

  searchAlbums(keyword: String, options: {}) {
    return new Promise((resolve, reject) => {
      resolve(albumResponse);
    });
  }
}

module.exports = SpotifyMock;
