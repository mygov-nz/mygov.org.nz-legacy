import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Layout, Views } from '../views';

/**
 * 
 * @param {string} filePath 
 * @param {{}} options 
 * @param {Function} callback 
 */
export default function render (filePath, options, callback) {
  if (undefined === views[filePath]) {
    return callback(new Error('View not found'));
  }

  const component = views[filePath];

  const layout = React.createElement(
    Layout,
    options.layout || {},
    React.createElement(component, options.props || {})
  );

  const markup = '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout);

  callback(null, markup);
}
