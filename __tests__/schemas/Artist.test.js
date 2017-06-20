
const Artist = require('../../src/schemas/Artist');

let schema: Artist;

beforeEach(() => {
  schema = new Artist();
});

describe('Artist schema', () => {
  describe('#constructor', () => {
    it('should not be empty', () => {
      expect(schema).toBeDefined();
    });

    it('should be instance of Artist', () => {
      expect(schema).toBeInstanceOf(Artist);
    });
  });
});
