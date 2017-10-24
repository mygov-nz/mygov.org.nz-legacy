import { resultSelector } from '../lib/tools/mmp-review-tool/selectors';
import { hashToParams } from '../lib/tools/mmp-review-tool/utils';
import MMPReviewTool from '../views/tools/MMPReviewTool';
import { addHeaders, render } from './utils';

const noop = () => {};

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
module.exports.index = (event, context, callback) => {
  callback(null, {
    statusCode: 302,
    headers: {
      Location: 'https://mygov.org.nz/tools/mmp-review/MjAxNywyLDAsMCwx'
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
module.exports.view = (event, context, callback) => {
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

  callback(null, {
    statusCode: 200,
    headers: addHeaders({
      Link: '<https://mygov.org.nz/tools/mmp-review>; rel="canonical"'
    }),
    body: render(MMPReviewTool, props, {
      nav: 'tools/mmp-review',
      title: 'MMP Review Tool - MyGov',
      description: 'This tool was created to allow users to evaluate the possible effects of changes to rules determining the outcome of a New Zealand General Election.',
      scripts: [
        '/js/mmp-review-tool.js'
      ]
    })
  });
};
