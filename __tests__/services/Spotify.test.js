
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

  describe('#_searchSong', () => {
    it('should return a promise', () => {
      expect(service._searchSong('', 5)).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Songs', () => {
      return service._searchSong('', 5)
        .then(res => expect(res).toBeArrayOf(Song));
    });
  });

  describe('#_searchArtist', () => {
    it('should return a promise', () => {
      expect(service._searchArtist('', 5)).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Artist', () => {
      return service._searchArtist('', 5)
        .then(res => expect(res).toBeArrayOf(Artist));
    });
  });

  describe('#_searchAlbum', () => {
    it('should return a promise', () => {
      expect(service._searchAlbum('', 5)).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Artist', () => {
      return service._searchAlbum('', 5)
        .then(res => expect(res).toBeArrayOf(Album));
    });
  });
});
