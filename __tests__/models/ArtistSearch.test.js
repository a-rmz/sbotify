// @flow

const ArtistSearch = require('../../src/models/ArtistSearch');
const Artist = require('../../src/schemas/Artist');
jest.mock('spotify-web-api-node');

let artistSearch: ArtistSearch;

beforeEach(() => {
  artistSearch = new ArtistSearch('', 0);
});

describe('ArtistSearch', () => {
  describe('#constructor', () => {
    it('should not be empty', () => {
      expect(artistSearch).toBeDefined();
    });

    it('should be instance of Artist', () => {
      expect(artistSearch).toBeInstanceOf(ArtistSearch);
    });
  });

  describe('#getArtists', () => {
    beforeEach(() => {
      artistSearch.search();
    });

    it('should return a promise', () => {
      expect(artistSearch.getResults()).toBeInstanceOf(Promise);
    });

    it('should resolve to an array of Artists', () => {
      return artistSearch.getResults()
        .then(res => expect(res).toBeArrayOf(Artist));
    });
  });
});
