const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello, world!')
  next();
});

app.post('/pr-release', (req, res, next) => {
  console.log(req.body);
  res.send();
  next();
});

app.listen(5000, () => console.log('Listening on port 5000...'));