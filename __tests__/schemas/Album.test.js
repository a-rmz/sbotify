// @flow

const Album = require('../../src/schemas/Album');

let schema: Album;

beforeEach(() => {
  schema = new Album();
});

describe('Album schema', () => {
  describe('#constructor', () => {
    it('should not be empty', () => {
      expect(schema).toBeDefined();
    });

    it('should be instance of Album', () => {
      expect(schema).toBeInstanceOf(Album);
    });
  });
});
