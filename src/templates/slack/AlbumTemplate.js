/* @flow */

const Album = require('../../schemas/Album');
const CardTemplate = require('./CardTemplate');
const ResponseTemplate = require('./ResponseTemplate');

class AlbumTemplate {

  static getBasicAlbumCard(album: Album): CardTemplate {
    const albumCard: CardTemplate = new CardTemplate();

    albumCard.title = album.name;
    albumCard.thumb_url = album.imageUrl;

    const artist = album.artists.join(', ');
    albumCard.addField('Artist(s)', artist, true);

    return albumCard;
  }

  static getAlbumCardArray(albums: Album[], username: string): CardTemplate[] {
    const cards: CardTemplate[] = albums.map(album => {
      const card: CardTemplate = AlbumTemplate.getBasicAlbumCard(album);

      card.callback_id = 'album';
      card.attachment_type = 'default';
      const albumHash: string = album.name.toLowerCase().replace(' ', '_');

      const callbackCard: CardTemplate[] = AlbumTemplate.getBasicAlbumCard(album).toArray();

      const callbackMessage: string = (username) ?
        `@${username} wants you to check out this album!\n${album.url}` :
        'Check this out!\n';
      const callbackResponse = new ResponseTemplate(
        callbackMessage,
        callbackCard
      );
      card.addButton(`share_${albumHash}`, 'Share!', callbackResponse.toString());

      return card;
    });

    return cards;
  }

}

module.exports = AlbumTemplate;
