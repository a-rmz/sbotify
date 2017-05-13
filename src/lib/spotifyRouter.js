/* @flow */

const router = require('express').Router();
const SpotifyController = require('./SpotifyController');
const controller = new SpotifyController();

const validParams = ['song', 'artist'];

/**
 * Middleware layer that verifies that both parameter and keyword
 * are present in the command
 */
router.post('/', (req, res, next) => {
  const { body } = req;
  const { text } = body;

  const [param, keyword] = text.split(' ');
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
