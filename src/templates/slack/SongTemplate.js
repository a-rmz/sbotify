/* @flow */

const Song = require('../../schemas/Song');
const CardTemplate = require('./CardTemplate');
const ResponseTemplate = require('./ResponseTemplate');

class SongTemplate {

  static getBasicSongCard(song: Song): CardTemplate {
    const songCard: CardTemplate = new CardTemplate();

    songCard.title = song.title;
    songCard.thumb_url = song.imageUrl;

    const artist = song.artists.join(', ');
    songCard.addField('Artist(s)', artist, true);
    songCard.addField('Album', song.albumName, true);

    return songCard;
  }

  static getSongCardArray(songs: Song[]): ResponseTemplate {
    const cards: CardTemplate[] = songs.map(song => {
      const card: CardTemplate = SongTemplate.getBasicSongCard(song);

      card.callback_id = 'song';
      card.attachment_type = 'default';
      const songHash: string = song.title.toLowerCase().replace(' ', '_');

      const callbackCard: CardTemplate[] = SongTemplate.getBasicSongCard(song).toArray();

      const callbackResponse = new ResponseTemplate(
        `Check this out!\n${song.url}`,
        callbackCard
      );
      card.addButton(`share_${songHash}`, 'Share!', callbackResponse.toString());

      return card;
    });

    const responseText: string = (cards.length > 0) ?
        'Okay, this is what I found:' :
        'I\'m sorry, I didn\'t find anything. ☹️';
    return new ResponseTemplate(responseText, cards);
  }

}

module.exports = SongTemplate;
