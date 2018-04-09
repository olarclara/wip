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
  web.chat.postMessage({
    channel: channelId,
    text: 'Hello there',
  })
  .then(res => console.log('Message sent: ', res.ts))
  .catch(console.error);
  res.end();
  next();
});

app.listen(5000, () => console.log('Listening on port 5000...'));