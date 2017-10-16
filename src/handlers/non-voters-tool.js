import React from 'react';
import ReactDOM from 'react-dom/server';
import { resultSelector } from '../lib/tools/non-voters-tool/selectors';
import { hashToParams } from '../lib/tools/non-voters-tool/utils';
import Layout from '../views/Layout';
import NonVotersTool from '../views/tools/NonVotersTool';

const noop = () => {};

exports.view = (req, res) => {
  const state = hashToParams(req.params.hash);
  const props = resultSelector(state);

  props.params = state;
  props.handlers = {
    setParty: noop,
    setUnenrolled: noop,
    setVotes: noop,
    setYear: noop
  };

  const layoutProps = {
    cdn: 'http://localhost:3000',
    nav: 'tools/non-voters',
    title: 'Non-voters Tool - MyGov',
    description: 'This tool was created to allow users to evaluate the possible effects of hypothetical situations where non-voters had instead chosen to vote.',
    scripts: [
      '/js/non-voters-tool.js'
    ]
  };

  const view = React.createElement(NonVotersTool, props);
  const layout = React.createElement(Layout, layoutProps, view);

  if ('production' === process.env.NODE_ENV) {
    res.set('Cache-Control', 'max-age=86400');
  }

  res.set('Link', '<https://mygov.org.nz/tools/non-voters>; rel="canonical"');
  res.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout));
};
