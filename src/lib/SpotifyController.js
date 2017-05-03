const SpotifyWebApi = require('spotify-web-api-node');

const api = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

class SpotifyController {
  constructor() {
    this.api = api;
  }

  search(param, keyword) {
    switch(param) {
      case 'song':
        return this._searchTrack(keyword);
        break;
      case 'artist':
        return this._searchArtist(keyword);
        break;
      case 'album':
        return this._searchAlbum(keyword)
        break;
    }
  }

  _searchTrack(keyword) {
    return api.searchTracks(keyword, {limit: 5});
  }

  _searchArtist(keyword) {
    return api.searchArtists(keyword, {limit: 5})
    .then(data => {
      const { items } = data.body.artists;
      
      const response = {
        text: 'Okay, this is what I found:'
      };
      const attachments = items.map(
          item => {
            const image = (item.images[0]) ? item.images[0].url : null;

            return {
              title: item.name,
              thumb_url: image,
              callback_id: 'someid',
              fields: [
                {
                  title: 'Followers',
                  value: item.followers.total,
                  short: true 
                }
              ],
              attachment_type: 'default',
              actions: [
                {
                  name: 'share',
                  text: 'Share!',
                  type: 'button',
                  value: JSON.stringify({
                    title: item.name,
                    thumb_url: image
                  })
                }
              ]
            };
          });
      response.attachments = attachments;

      console.log(JSON.stringify(response, null, 2)); 
      return response;
    });
  }

  _searchAlbum(keyword) {
    return api.searchAlbums(keyword, {limit: 5});
  }

}

module.exports = SpotifyController;
