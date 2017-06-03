/* @flow */

const EventEmitter = require('events');
const SpotifyWebApi = require('spotify-web-api-node');

const logger = require('./logger');

const TOKEN_TTL = 3600;

class SpotifyAPI extends SpotifyWebApi {

  api: SpotifyWebApi;
  tokenTTL: number;
  eventEmitter: EventEmitter;

  constructor() {
    super({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    this.eventEmitter = new EventEmitter();
    this.tokenTTL = TOKEN_TTL;

    // First time token refresh
    this.refreshToken();

    this.setRefreshTokenListener();
    this.startRefreshTokenService();
  }

  refreshToken() {
    logger.debug('Refreshing token');
    this.clientCredentialsGrant()
      .then(data => {
        logger.debug(`The new token is ${data.body.access_token}`);
        this.tokenTTL = Number(data.body['expires_in']) || TOKEN_TTL;
        this.setAccessToken(data.body['access_token']);
      })
      .catch(err => {
        logger.error('Something went wrong when retrieving an access token', err);
      });
  }

  startRefreshTokenService() {
    const interval: number = this.tokenTTL * 1000;
    logger.debug(`Token refresh service running every ${interval / 1000} seconds`);
    setInterval(() => {
      this.eventEmitter.emit('token_refresh');
    }, interval);
  }

  setRefreshTokenListener() {
    this.eventEmitter.on('token_refresh', () => {
      this.refreshToken();
    });
  }
}

const api: SpotifyAPI = new SpotifyAPI();

module.exports = api;
