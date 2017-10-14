'use strict';

require('babel-register');

const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');

const MMPReviewTool = require('./src/views/tools/MMPReviewTool');
const NonVotersTool = require('./src/views/tools/NonVotersTool');

const app = express();

app.use(express.static(__dirname + '/build/s3'));

app.get('/', (req, res) => {
  res.redirect('/tools');
});

app.get('/tools', (req, res) => {
  res.send('Tools');
});

app.get('/tools/mmp-review', (req, res) => {
  res.send('MMP Review Tool');
});

app.get('/tools/non-voters', (req, res) => {
  const element = '';

  res.send('<!DOCTYPE html>');
  res.send(ReactDOM.renderToString(element));
  res.end();
});

app.listen(3000, () => {
  console.log('MyGov dev server listening on port 3000!');
});
