/* @flow */

const router = require('express').Router();
const SpotifyController = require('./SpotifyController');
const controller = new SpotifyController();

const validParams = ['song', 'artist', 'album'];

/**
 * Ensure the token is valid
 * @type {void}
 */
router.post('/', (req, res, next) => {
  if (req.body.token == process.env.SLACK_VERIFY_TOKEN) {
    next();
  }
});

/**
 * Middleware layer that verifies that both parameter and keyword
 * are present in the command
 * @type {void}
 */
router.post('/', (req, res, next) => {
  const { body } = req;
  const { text } = body;

  const tokens: [string] = text.split(' ');
  const param: string = tokens[0];
  const keyword: string = tokens.slice(1).join(' ');

  console.log(param);
  console.log(keyword);

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
router.post('/', (req, res) => {
  const param: string = req.param;
  const keyword: string = req.keyword;

  controller.search(param, keyword)
    .then(response => {
      res.status(200).send(response);
    });

});

module.exports = router;
