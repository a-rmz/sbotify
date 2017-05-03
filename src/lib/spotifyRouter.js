
const rp = require('request-promise');
const router = require('express').Router();
const SpotifyController = require('./SpotifyController');
const controller = new SpotifyController();

const validParams = ['song', 'artist'];

router.post('/', (req, res, next) => {
  const { body } = req;
  const { text, channel_id, user_id } = body;
  console.log(JSON.stringify(body, null, 2));
  console.log(channel_id);

  const [param, keyword] = text.split(' ');
  console.log(param, keyword);
  if (validParams.indexOf(param) === -1 || keyword.length <= 0) {
    res.status(200).send('Please enter a valid command!'); 
    return;
  }

  req.param = param;
  req.keyword = keyword;
  next();
});

router.post('/', (req, res) => {
  controller.search(req.param, req.keyword)
    .then(response => {
      res.status(200).send(response);
    });
});



module.exports = router;
