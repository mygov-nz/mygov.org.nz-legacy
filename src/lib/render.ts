import path from 'path';
import * as React from 'react';
import ReactDOM from 'react-dom/server';
import Layout, { views } from '../views';

const offset: number = path.resolve('build/views').length + 1;

/**
 * @param {string} filePath
 * @param {{}} options
 * @param {Function} callback
 */
export default function render (filePath: string, options, callback: (error: any, result?: any) => any): void {
  const name: string = filePath.slice(offset, -3);

  if (undefined === views[name]) {
    return callback(new Error('View not found'));
  }

  const component: React.ComponentType = views[name];

  const layout: JSX.Element = React.createElement(
    Layout,
    options.layout || {},
    React.createElement(component, options.props || {})
  );

  const markup: string = '<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(layout);

  callback(null, markup);
}
