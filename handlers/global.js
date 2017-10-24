import Tools from '../views/tools/Tools';
import { addHeaders, render } from './utils';

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
module.exports.homepage = (event, context, callback) => {
  callback(null, {
    statusCode: 302,
    headers: {
      Location: 'https://mygov.org.nz/tools'
    }
  });
};

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
module.exports.tools = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: addHeaders(),
    body: render(Tools, {}, {
      nav: 'tools',
      title: 'MyGov Tools',
      description: 'Tools'
    })
  });
};
