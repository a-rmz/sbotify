/* @flow */

const SpotifyWebApi = require('spotify-web-api-node');

const api = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

class SpotifyController {

  // Props
  api: SpotifyWebApi

  // Methods
  constructor() {
    this.api = api;
  }

  /**
   * Search wrapper method. According to the parameter passed to the command,
   * searchs the Spotify API and formats the message.
   *
   * @method search
   * @param  {string} param   The type of query to be done
   * @param  {string} keyword The query term
   * @return {Promise}        The formatted message
   */
  search(param: string, keyword: string): Promise<any> {
    const limit: number = 5;
    switch (param) {
      case 'song':
        return this._searchTrack(keyword, limit);
      case 'artist':
        return this._searchArtist(keyword, limit);
      case 'album':
        return this._searchAlbum(keyword, limit);
    }
    return this._unknownParams();
  }

/**
 * Search the API by track name
 * @method _searchTrack
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise}    A formatted message with tracks info
 */
  _searchTrack(keyword: string, limit: number) {
    return api.searchTracks(keyword, {limit: limit});
  }

/**
 * Search the API by artist name
 * @method _searchArtist
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise}    A formatted message with artists info
 */
  _searchArtist(keyword: string, limit: number) {
    return api.searchArtists(keyword, {limit: limit})
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
      const { items } = data.body.artists;
      const response = { };

      const attachments: [any] = items.map(
          item => {
            const image = (item.images[0]) ? item.images[0].url : null;
            let genres = (item.genres.length > 5) ?
              item.genres.slice(0, 5).join(', ') :
              item.genres.join(', ');
            // Capitalize the first letter
            genres = genres.charAt(0).toUpperCase() + genres.slice(1);
            const callback_text = `Check this out:\n${item.external_urls.spotify}`;

            return {
              title: item.name,
              thumb_url: image,
              callback_id: 'artist',
              fields: [
                {
                  title: 'Followers',
                  value: item.followers.total,
                  short: true,
                },
              ],
              attachment_type: 'default',
              actions: [
                {
                  name: 'share',
                  text: 'Share!',
                  type: 'button',
                  value: JSON.stringify({
                    text: callback_text,
                    attachment: {
                      title: item.name,
                      thumb_url: image,
                      fields: [
                        {
                          title: 'Genres',
                          value: genres,
                          short: true,
                        },
                        {
                          title: 'Followers',
                          value: item.followers.total,
                          short: true,
                        },
                      ],
                    }
                  }),
                },
              ],
            };
          });

      response.text = (attachments.length > 0) ?
        'Okay, this is what I found:' :
        'I\'m sorry, I didn\'t find anything. ☹️';
      response.attachments = attachments;

      return response;
    });
  }

/**
 * Search the API by album name
 * @method _searchAlbum
 * @param  {string}     keyword The query term
 * @param  {number}     The number of results to return
 * @return {Promise}    A formatted message with albums info
 */
  _searchAlbum(keyword: string, limit: number) {
    return api.searchAlbums(keyword, {limit: limit});
  }

/**
 * Default case where no valid command is issued
 * @method _unknownParams
 * @return {Promise}    A no valid command message
 */
  _unknownParams() {
    return new Promise((resolve, reject) => {
      resolve({
        text: 'Oops, please enter a valid command'
      });
    });
  }

}

module.exports = SpotifyController;
