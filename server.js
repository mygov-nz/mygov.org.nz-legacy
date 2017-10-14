'use strict';

require('babel-register')({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  ignore: [/node_modules/],
  only: [/src/]
});

const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');

const app = express();

app.use(express.static(__dirname + '/build/s3'));

app.get('/', (req, res) => {
  res.redirect('/tools');
});

app.get('/tools', (req, res) => {
  res.send('Tools');
});

app.get('/tools/mmp-review', require('./src/handlers/mmp-review-tool').view);

app.get('/tools/non-voters', (req, res) => {
  res.send('Non-voters Tool');
});

app.listen(3000, () => {
  console.log('MyGov dev server listening on port 3000!');
});
