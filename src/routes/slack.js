/* @flow */

const logger = require('../lib/logger');

const rp = require('request-promise');
const router = require('express').Router();

const SlackCredentialModel = require('../models/SlackCredentialModel');
const SlackCredential = require('../schemas/SlackCredential');

const SongSearch = require('../models/SongSearch');
const SongTemplate = require('../templates/slack/SongTemplate');

const ArtistSearch = require('../models/ArtistSearch');
const ArtistTemplate = require('../templates/slack/ArtistTemplate');

const AlbumSearch = require('../models/AlbumSearch');
const AlbumTemplate = require('../templates/slack/AlbumTemplate');

const CardTemplate = require('../templates/slack/CardTemplate');
const ResponseTemplate = require('../templates/slack/ResponseTemplate');

const validParams = ['song', 'artist', 'album'];

const getTokens = text => text.split(' ');
const getSearchParameter = text => getTokens(text)[0];
const isValidSearchParameter = text => validParams.includes(getSearchParameter(text));
const isValidKeyword = text => buildKeyword(text);
const buildKeyword = text => getTokens(text).slice(1).join(' ');

const decorateRequest = (req: any, text: string, username: string): any => {
  req.username = username;
  req.searchParam = getSearchParameter(text);
  req.keyword = buildKeyword(text);
};

/**
 * Middleware layer that verifies that both parameter and keyword
 * are present in the command
 * @type {void}
 */
router.post('/incoming', (req, res, next) => {
  const { body } = req;
  const text: string = body.text;
  const username: string = body.user_name;

  if (!isValidSearchParameter(text) || !isValidKeyword(text)) {
    res.status(200).send('Please enter a valid command!');
  }

  decorateRequest(req, text, username);
  next();
});
/**
 * Main router endpoint.
 * Makes the call to the controller and returns the message
 * @type {void}
 */
router.post('/incoming', (req, res) => {

  const param: string = req.searchParam;
  const keyword: string = req.keyword;
  const username: string = req.username;

  let result: Promise<*>;
  switch (param) {
    case 'song':
      const songSearch = new SongSearch(keyword, 5);
      songSearch.search();
      const songs = songSearch.getResults();
      result = songs.then(resultSongs => SongTemplate.getSongCardArray(resultSongs, username));
      break;
    case 'artist':
      const artistSearch = new ArtistSearch(keyword, 5);
      artistSearch.search();
      const artists = artistSearch.getResults();
      result = artists.then(resultArtists => ArtistTemplate.getArtistCardArray(resultArtists, username));
      break;
    case 'album':
      const albumSearch = new AlbumSearch(keyword, 5);
      const albums = albumSearch.search();
      result = albums.then(resultAlbums => AlbumTemplate.getAlbumCardArray(resultAlbums, username));
      break;
    default:
      result = new Promise((resolve, reject) => reject());
  }

  result
    .then((cards: CardTemplate[]) => {
      const responseText: string = (cards.length > 0) ?
        'Okay, this is what I found:' :
        'I\'m sorry, I didn\'t find anything. ☹️';

      const response: ResponseTemplate = new ResponseTemplate(responseText, cards);
      res.status(200).send(response);
      return;
    })
    .catch(reason => {
      logger.error(reason);
      res.status(200).send('Sorry, something went terribly wrong. ☹️');
      return;
    });

  logger.info({
    action: 'search',
    platform: 'Slack',
    command: param,
    term: keyword
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

  SlackCredentialModel.retrieve(payload.team.id)
    .then(credential => {
      rp({
        method: 'GET',
        uri: 'https://slack.com/api/chat.postMessage',
        qs: {
          token: credential.accessToken,
          channel: payload.channel.id,
          text: text,
          as_user: false,
          link_names: true,
          attachments: attachment
        }
      })
      .then(res => {
        const response = JSON.parse(res);
        if (response.ok) {
          logger.info({
            action: 'post',
            Platform: 'Slack',
            attachment: attachments
          });
        } else {
          throw new Error(response);
        }
      })
      .catch(reason => logger.error({
        reason,
        action: 'post',
        Platform: 'Slack'
      }));
    });

});

router.get('/auth', (req, res) => {
  const state: string = req.query.state;
  const code: string = req.query.code;

  rp({
    method: 'GET',
    uri: 'https://slack.com/api/oauth.access',
    qs: {
      code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_uri: process.env.SLACK_REDIRECT_URI
    }
  })
    .then(response => {
      const credentialResponse = JSON.parse(response);
      if (credentialResponse.ok) {
        const credential = new SlackCredential({
          accessToken: credentialResponse.access_token,
          teamName: credentialResponse.team_name,
          teamId: credentialResponse.team_id,
          botUserId: credentialResponse.bot.bot_user_id,
          botAccessToken: credentialResponse.bot.bot_access_token
        });

        SlackCredentialModel.save(credential);
        res.redirect('https://a-rmz.io/sbotify#success');
      } else {
        res.status(502).send(`Something went terribly wrong! 🔥
          Please shoot me an email to me@a-rmz.io to let me know about this. :)`);
      }
    });

});

module.exports = router;
