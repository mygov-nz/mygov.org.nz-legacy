/**
 * Should the URL be directed to the API Gateway
 *
 * @param  {string}  url
 * @return {boolean}
 */
function useLambda(url) {
  if ('/' === url) {
    return true;
  }

  if ('/tools' === url.slice(0, 6)) {
    return true;
  }

  return false;
}

/**
 * Cloudfront
 *
 * @param  {*}        event    Cloudfront event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
module.exports.request = (event, context, callback) => {
  const req = event.Records[0].cf.request;

  if (req.method !== 'GET') {
    req.method = 'GET';
  }

  if (useLambda(req.uri)) {
    req.headers.host.value = process.env.API_GATEWAY;
  }

  callback(null, req);
};
