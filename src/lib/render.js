import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Layout, { views } from '../views';

const offset = path.resolve('build/views').length + 1;

/**
 * 
 * @param {string} filePath 
 * @param {{}} options 
 * @param {Function} callback 
 */
export default function render (filePath, options, callback) {
  const name = filePath.slice(offset, -3);

  if (undefined === views[name]) {
    return callback(new Error('View not found'));
  }

  const component = views[name];

  const layout = React.createElement(
    Layout,
    options.layout || {},
    React.createElement(component, options.props || {})
  );

  const markup = '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout);

  callback(null, markup);
}
