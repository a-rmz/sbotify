require('dotenv').load();

const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');
const spotifyRouter = require('./lib/spotifyRouter');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/incoming', spotifyRouter);

app.post('/postback', (req, res) => {
  const { body } = req;
  const payload = JSON.parse(body.payload);
  const attachment = JSON.parse(payload.actions[0].value);

  console.log(JSON.stringify(payload, null, 2));

  const response = {
    text: 'Here\'s something for you!', 
    response_type: 'in_channel',
    attachments: [attachment]
  };
  
  rp({
    method: 'POST',
    //uri: 'https://slack.com/api/chat.postMessage',
    uri: 'https://hooks.slack.com/actions/T2A4F22CT/175730209876/CTNumsa5aWBpt7iCwrv7xIpe',
    qs: {
      //token: 'xoxb-174962537552-9pTW9b1B4JBbjZ3tEEIsHjaH',
      //username: 'Sbotify',
      channel: payload.channel.id,
      //response_type: 'in_channel',
      attachments: response
    },
    json: true
  })
    .then(r => console.log(r))
    .catch(e => console.log(e));

  res.status(200)//.send(response);
});

app.listen(process.env.PORT || 4500, () => {
    console.log('Sbotify server running!');
});
