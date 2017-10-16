import React from 'react';
import ReactDOM from 'react-dom/server';
import { resultSelector } from '../lib/tools/non-voters-tool/selectors';
import { hashToParams } from '../lib/tools/non-voters-tool/utils';
import Layout from '../views/Layout';
import NonVotersTool from '../views/tools/NonVotersTool';

const noop = () => {};

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
exports.index = (event, context, callback) => {
  callback(null, {
    statusCode: 302,
    headers: [
      'Location: https://mygov.org.nz/tools/non-voters/MjAxNyxAbncsNTAsMA=='
    ]
  });
};

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
exports.view = (event, context, callback) => {
  const state = hashToParams(event.pathParameters.hash);
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

  callback(null, {
    statusCode: 200,
    headers: [
      'Cache-Control: max-age=' + ('production' !== process.env.NODE_ENV ? 1 : 86400),
      'Content-Type: text/html; charset=utf-8',
      'Link: <https://mygov.org.nz/tools/non-voters>; rel="canonical"'
    ],
    body: '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout)
  });
};
