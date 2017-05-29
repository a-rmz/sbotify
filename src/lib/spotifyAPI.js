/* @flow */

const EventEmitter = require('events');
const SpotifyWebApi = require('spotify-web-api-node');

const logger = require('./logger');
const eventEmitter = new EventEmitter();

class SpotifyAPI extends SpotifyWebApi {

  api: SpotifyWebApi;
  tokenTTL: number;

  constructor() {
    super({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    this.refreshToken();

    this.tokenTTL = 3600;
  }

  refreshToken() {
    logger.debug('Refreshing token');
    this.clientCredentialsGrant()
      .then(data => {
        logger.debug(`The new token is ${data.body.access_token}`);
        this.tokenTTL = Number(data.body['expires_in']);
        this.setAccessToken(data.body['access_token']);
      })
      .catch(err => {
        logger.error('Something went wrong when retrieving an access token', err);
      });
  }

  setRefreshTokenService() {
    const interval: number = this.tokenTTL * 1000;
    logger.debug(`Token refresh service running every ${interval / 1000} seconds`);
    setInterval(() => {
      eventEmitter.emit('token_refresh');
    }, interval);
  }
}

const api: SpotifyAPI = new SpotifyAPI();
eventEmitter.on('token_refresh', () => {
  api.refreshToken();
});

module.exports = api;
