const express = require('express');
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/client');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const web = new WebClient(process.env.SLACK_TOKEN);
const channelId = 'CA3HATELE';

app.get('/', (req, res, next) => {
  res.send('Hello, world!')
  next();
});

app.post('/pr-release', (req, res, next) => {
  if (req.body.pull_request.title.match(/release/i)) {
    web.chat.postMessage({
      channel: channelId,
      text: `${req.body.pull_request.title} of ${req.body.repository.name} needs to be reviewed. ${req.body.pull_request.url}`,
    })
    .then(res => console.log('Message sent: ', res.ts))
    .catch(console.error);
  }
  res.end();
  next();
});

app.listen(5000, () => console.log('Listening on port 5000...'));