
const Song = require('../../src/schemas/Song');

let schema: Song;

beforeEach(() => {
  schema = new Song();
});

describe('Song schema', () => {
  describe('#constructor', () => {
    it('should not be empty', () => {
      expect(schema).toBeDefined();
    });

    it('should be instance of Song', () => {
      expect(schema).toBeInstanceOf(Song);
    });
  });
});
