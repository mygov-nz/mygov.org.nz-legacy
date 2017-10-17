/**
 * [csp description]
 *
 * @return {[type]} [description]
 */
function csp() {
  const rules = {
    'sandbox': ['allow-forms', 'allow-scripts', 'allow-same-origin'],
    'default-src': ['\'none\''],
    'script-src': ['\'self\'', '\'unsafe-inline\'', 'cdn.mygov.co.nz', 'www.google-analytics.com', 'stats.g.doubleclick.net'],
    'style-src': ['\'self\'', '\'unsafe-inline\'', 'cdn.mygov.co.nz'],
    'img-src': ['\'self\'', 'cdn.mygov.co.nz', 'www.google-analytics.com', 'stats.g.doubleclick.net', 'data:'],
    'font-src': ['\'self\'', 'cdn.mygov.co.nz', 'fonts.gstatic.com', 'data:']
  };

  return Object.keys(rules).map(key => `${key} ${rules[key].implode(' ')}`);
}

const defaultHeaders = {
  'Cache-Control': 'max-age=' + ('production' !== process.env.NODE_ENV ? 1 : 86400),
  'Content-Type': 'text/html; charset=utf-8',
  'Content-Security-Policy': csp(),
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
  const headers = {};

  Object.keys(defaultHeaders).forEach(key => headers[key] = defaultHeaders[key]);
  Object.keys(pageHeaders).forEach(key => headers[key] = pageHeaders[key]);

  return Object.keys(headers).map(key => `${key}: ${headers[key]}`);
}
