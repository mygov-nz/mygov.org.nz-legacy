import React from 'react';
import ReactDOM from 'react-dom/server';
import Layout from '../views/Layout';

const debug = process.env.NODE_ENV !== 'production';
const cdn = debug ? 'cdn-dev.mygov.org.nz' : 'cdn.mygov.org.nz';

/**
 * [csp description]
 *
 * @return {[type]} [description]
 */
function csp() {
  const rules = {
    'sandbox': ['allow-forms', 'allow-scripts', 'allow-same-origin'],
    'default-src': ['\'none\''],
    'script-src': ['\'self\'', '\'unsafe-inline\'', cdn, 'www.google-analytics.com', 'stats.g.doubleclick.net'],
    'style-src': ['\'self\'', '\'unsafe-inline\'', cdn],
    'img-src': ['\'self\'', cdn, 'www.google-analytics.com', 'stats.g.doubleclick.net', 'data:'],
    'font-src': ['\'self\'', cdn, 'fonts.gstatic.com', 'data:']
  };

  return Object.keys(rules).map(key => `${key} ${rules[key].join(' ')}`).join('; ');
}

const defaultHeaders = {
  // 'Cache-Control': 'max-age=' + ('production' !== debug ? 60 : 86400),
  'Content-Type': 'text/html; charset=utf-8',
  // 'Content-Security-Policy': csp(),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-UA-Compatible': 'IE=Edge',
  'X-XSS-Protection': '1; mode=block'
};

/**
 * [addHeaders description]
 *
 * @param {Array} [pageHeaders=[]] [description]
 * @return {[type]} [description]
 */
export function addHeaders(pageHeaders = {}) {
  return Object.assign({}, defaultHeaders, pageHeaders);
}

/**
 * [render description]
 *
 * @param  {[type]} component   [description]
 * @param  {[type]} props       [description]
 * @param  {[type]} layoutProps [description]
 * @return {[type]}             [description]
 */
export function render(component, props, layoutProps) {
  layoutProps.cdn = `https://${cdn}`;

  const view = React.createElement(component, props);
  const layout = React.createElement(Layout, layoutProps, view);
  const markup = ReactDOM.renderToStaticMarkup(layout);

  return '<!DOCTYPE html>' + markup;
}
