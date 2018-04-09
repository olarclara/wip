const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(5000, () => console.log('Listening on port 5000...'));