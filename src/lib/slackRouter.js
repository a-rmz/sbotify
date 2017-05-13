/* @flow */

const rp = require('request-promise');
const router = require('express').Router();
const spotifyRouter = require('./spotifyRouter');

router.use('/incoming', spotifyRouter);

/**
 * Main router endpoint.
 * Makes the call to the controller and returns the message
 */
router.post('/postback', (req, res) => {
  res.sendStatus(200);

  const { body } = req;
  const payload = JSON.parse(body.payload);
  const { attachment, text } = JSON.parse(payload.actions[0].value);
  const attachments = [attachment];

  rp({
    method: 'GET',
    uri: 'https://slack.com/api/chat.postMessage',
    qs: {
      token: process.env.SLACK_BOT_TOKEN,
      channel: payload.channel.id,
      text: text,
      attachments: JSON.stringify(attachments)
    }
  })
  .catch(err => console.log(err));

});

module.exports = router;
