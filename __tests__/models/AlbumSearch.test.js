// @flow

const AlbumSearch = require('../../src/models/AlbumSearch');
const Album = require('../../src/schemas/Album');
jest.mock('spotify-web-api-node');

let albumSearch: AlbumSearch;

beforeEach(() => {
  albumSearch = new AlbumSearch('', 0);
});

describe('AlbumSearch', () => {
  describe('#constructor', () => {
    it('should not be empty', () => {
      expect(albumSearch).toBeDefined();
    });

    it('should be instance of Album', () => {
      expect(albumSearch).toBeInstanceOf(AlbumSearch);
    });
  });

  describe('#getAlbums', () => {
    it('should return a promise', () => {
      expect(albumSearch.search()).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Albums', () => {
      return albumSearch.search()
        .then(res => expect(res).toBeArrayOf(Album));
    });
  });
});
