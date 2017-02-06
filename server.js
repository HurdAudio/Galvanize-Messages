'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const messages = require('./routes/messages');
const path = require('path');

app.use(express.static(path.join('public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }));

app.use('/messages',messages);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
