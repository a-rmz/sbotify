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

  static getSongCardArray(songs: Song[], username: string): CardTemplate[] {
    const cards: CardTemplate[] = songs.map(song => {
      const card: CardTemplate = SongTemplate.getBasicSongCard(song);

      card.callback_id = 'song';
      card.attachment_type = 'default';
      const songHash: string = song.title.toLowerCase().replace(' ', '_');

      const callbackCard: CardTemplate[] = SongTemplate.getBasicSongCard(song).toArray();

      const callbackMessage: string = (username) ?
        `@${username} wants you to check out this song!\n${song.url}` :
        'Check this out!\n';
      const callbackResponse = new ResponseTemplate(
        callbackMessage,
        callbackCard
      );
      card.addButton(`share_${songHash}`, 'Share!', callbackResponse.toString());

      return card;
    });

    return cards;
  }

}

module.exports = SongTemplate;
