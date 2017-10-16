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

  if ('production' === process.env.NODE_ENV) {
    res.set('Cache-Control', 'max-age=86400');
  }

  res.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout));
};
