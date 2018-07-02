// @flow

jest.mock('spotify-web-api-node');
const Spotify = require('../../src/services/Spotify');

// Schemas
const Song = require('../../src/schemas/Song');
const Artist = require('../../src/schemas/Artist');
const Album = require('../../src/schemas/Album');

// Service to be tested
let service: Spotify;

beforeEach(() => {
  service = new Spotify();
});

describe('Spotify Service', () => {
  describe('#constructor', () => {
    it('should be instance of Spotify', () => {
      expect(service).toBeInstanceOf(Spotify);
    });

    it('should not be undefined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('#searchSong', () => {
    it('should return a promise', () => {
      expect(service.searchSong('', 5)).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Songs', () => {
      return service.searchSong('', 5)
        .then(res => expect(res).toBeArrayOf(Song));
    });
  });

  describe('#searchArtist', () => {
    it('should return a promise', () => {
      expect(service.searchArtist('', 5)).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Artist', () => {
      return service.searchArtist('', 5)
        .then(res => expect(res).toBeArrayOf(Artist));
    });
  });

  describe('#searchAlbum', () => {
    it('should return a promise', () => {
      expect(service.searchAlbum('', 5)).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Artist', () => {
      return service.searchAlbum('', 5)
        .then(res => expect(res).toBeArrayOf(Album));
    });
  });
});
