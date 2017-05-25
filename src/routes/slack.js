/* @flow */

const rp = require('request-promise');
const router = require('express').Router();

const SongSearch = require('../models/SongSearch');
const SongTemplate = require('../templates/slack/SongTemplate');

const ArtistSearch = require('../models/ArtistSearch');
const ArtistTemplate = require('../templates/slack/ArtistTemplate');

const AlbumSearch = require('../models/AlbumSearch');
const AlbumTemplate = require('../templates/slack/AlbumTemplate');

const ResponseTemplate = require('../templates/slack/ResponseTemplate');

const validParams = ['song', 'artist', 'album'];

/**
 * Middleware layer that verifies that both parameter and keyword
 * are present in the command
 * @type {void}
 */
router.post('/incoming', (req, res, next) => {
  const { body } = req;
  const { text } = body;

  const tokens: [string] = text.split(' ');
  const param: string = tokens[0];
  const keyword: string = tokens.slice(1).join(' ');

  if (validParams.indexOf(param) === -1 || keyword.length <= 0) {
    res.status(200).send('Please enter a valid command!');
    return;
  }

  req.param = param;
  req.keyword = keyword;
  next();
});

/**
 * Main router endpoint.
 * Makes the call to the controller and returns the message
 * @type {void}
 */
router.post('/incoming', (req, res) => {

  const param: string = req.param;
  const keyword: string = req.keyword;

  let result: Promise<*>;
  switch (param) {
    case 'song':
      const songSearch = new SongSearch(keyword, 5);
      songSearch.search();
      const songs = songSearch.getResults();
      result = songs.then(resultSongs => SongTemplate.getSongCardArray(resultSongs));
      break;
    case 'artist':
      const artistSearch = new ArtistSearch(keyword, 5);
      artistSearch.search();
      const artists = artistSearch.getResults();
      result = artists.then(resultArtists => ArtistTemplate.getArtistCardArray(resultArtists));
      break;
    case 'album':
      const albumSearch = new AlbumSearch(keyword, 5);
      albumSearch.search();
      const albums = albumSearch.getResults();
      result = albums.then(resultAlbums => AlbumTemplate.getAlbumCardArray(resultAlbums));
      break;
    default:
      result = new Promise((resolve, reject) => reject());

  }

  result
    .then(response => {
      res.status(200).send(response);
      return;
    })
    .catch(reason => {
      console.log(reason);
      res.status(200).send('Sorry, something went terribly wrong. ☹️');
      return;
    });


});

/**
 * Main router endpoint.
 * Makes the call to the controller and returns the message
 */
router.post('/postback', (req, res) => {
  res.sendStatus(200);

  const { body } = req;
  const payload: any = JSON.parse(body.payload);
  const value: any = JSON.parse(payload.actions[0].value);
  const attachments: ResponseTemplate[] = value.attachments;
  const text: string = value.text;
  const attachment: string = JSON.stringify(attachments);

  rp({
    method: 'GET',
    uri: 'https://slack.com/api/chat.postMessage',
    qs: {
      token: process.env.SLACK_BOT_TOKEN,
      channel: payload.channel.id,
      text: text,
      attachments: attachment
    }
  })
  .catch(err => console.log(err));

});

router.get('/auth', (req, res) => {
  const state: string = req.query.state;
  const code: string = req.query.code;
  console.log(process.env.SLACK_CLIENT_SECRET);

  rp({
    method: 'GET',
    uri: 'https://slack.com/api/oauth.access',
    qs: {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code,
      redirect_uri: process.env.SLACK_REDIRECT_URI
    }
  })
    .then(response => {
      console.log(response);
      if (response.ok) {
        const accessToken: string = response.access_token;
        const teamName: string = response.team_name;
        const teamId: string = response.team_id;
        const botUserId: string = response.bot.user_id;
        const botAccessToken: string = response.bot.bot_access_token;
      }
    });

  res.sendStatus(200);
});

module.exports = router;
