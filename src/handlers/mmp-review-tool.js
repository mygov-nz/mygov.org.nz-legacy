import React from 'react';
import ReactDOM from 'react-dom/server';
import { resultSelector } from '../lib/tools/mmp-review-tool/selectors';
import { hashToParams } from '../lib/tools/mmp-review-tool/utils';
import Layout from '../views/Layout';
import MMPReviewTool from '../views/tools/MMPReviewTool';

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
      'Location: https://mygov.org.nz/tools/mmp-review/MjAxNywyLDAsMCwx'
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
    setOverhang: noop,
    setTagAlong: noop,
    setTagAlongSeats: noop,
    setThreshold: noop,
    setYear: noop
  };

  const layoutProps = {
    cdn: 'http://localhost:3000',
    nav: 'tools/mmp-review',
    title: 'MMP Review Tool - MyGov',
    description: 'This tool was created to allow users to evaluate the possible effects of changes to rules determining the outcome of a New Zealand General Election.',
    scripts: [
      '/js/mmp-review-tool.js'
    ]
  };

  const view = React.createElement(MMPReviewTool, props);
  const layout = React.createElement(Layout, layoutProps, view);

  callback(null, {
    statusCode: 200,
    headers: [
      'Cache-Control: max-age=' + ('production' !== process.env.NODE_ENV ? 1 : 86400),
      'Content-Type: text/html; charset=utf-8',
      'Link: <https://mygov.org.nz/tools/mmp-review>; rel="canonical"'
    ],
    body: '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout)
  });
};
