
const SongSearch = require('../../src/models/SongSearch');
const Song = require('../../src/schemas/Song');
jest.mock('spotify-web-api-node');

let songSearch: SongSearch;

beforeEach(() => {
  songSearch = new SongSearch('', 0);
});

describe('SongSearch', () => {
  describe('#constructor', () => {
    it('should not be empty', () => {
      expect(songSearch).toBeDefined();
    });

    it('should be instance of Song', () => {
      expect(songSearch).toBeInstanceOf(SongSearch);
    });
  });

  describe('#getSongs', () => {
    beforeEach(() => {
      songSearch.search();
    });

    it('should return a promise', () => {
      expect(songSearch.getResults()).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Songs', () => {
      return songSearch.getResults()
        .then(res => expect(res).toBeArrayOf(Song));
    });
  });
});
