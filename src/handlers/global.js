import React from 'react';
import ReactDOM from 'react-dom/server';
import Layout from '../views/Layout';
import Tools from '../views/tools/Tools';

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
exports.homepage = (event, context, callback) => {
  callback(null, {
    statusCode: 302,
    headers: [
      'Location: https://mygov.org.nz/tools'
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
exports.tools = (req, res) => {
  const layoutProps = {
    cdn: 'http://localhost:3000',
    nav: 'tools',
    title: 'MyGov Tools',
    description: 'Tools',
    scripts: []
  };

  const view = React.createElement(Tools);
  const layout = React.createElement(Layout, layoutProps, view);

  callback(null, {
    statusCode: 200,
    headers: [
      'Cache-Control: max-age=' + ('production' !== process.env.NODE_ENV ? 1 : 86400),
      'Content-Type: text/html; charset=utf-8'
    ],
    body: '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout)
  });
};
