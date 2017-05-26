/* @flow */

const Artist = require('../../schemas/Artist');
const CardTemplate = require('./CardTemplate');
const ResponseTemplate = require('./ResponseTemplate');

class ArtistTemplate {

  static getBasicArtistCard(artist: Artist): CardTemplate {
    const artistCard: CardTemplate = new CardTemplate();

    artistCard.title = artist.name;
    artistCard.thumb_url = artist.imageUrl;

    if (artist.followers) {
      artistCard.addField('Followers', artist.followers.toString(10), true);
    }
    if (artist.genres.length > 0) {
      const genres: string = artist.genres.slice(0, 5).join(', ');
      artistCard.addField('Genres', genres, true);
    }

    return artistCard;
  }

  static getArtistCardArray(artists: Artist[]): ResponseTemplate {
    const cards: CardTemplate[] = artists.map(artist => {
      const card: CardTemplate = ArtistTemplate.getBasicArtistCard(artist);

      card.callback_id = 'artist';
      card.attachment_type = 'default';
      const artistHash: string = artist.name.toLowerCase().replace(' ', '_');

      const callbackCard: CardTemplate[] = ArtistTemplate.getBasicArtistCard(artist).toArray();

      const callbackResponse = new ResponseTemplate(
        `Check this out!\n${artist.url}`,
        callbackCard
      );
      card.addButton(`share_${artistHash}`, 'Share!', callbackResponse.toString());

      return card;
    });

    const responseText: string = (cards.length > 0) ?
        'Okay, this is what I found:' :
        'I\'m sorry, I didn\'t find anything. ☹️';
    return new ResponseTemplate(responseText, cards);
  }

}

module.exports = ArtistTemplate;
