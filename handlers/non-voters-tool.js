import { resultSelector } from '../lib/tools/non-voters-tool/selectors';
import { hashToParams } from '../lib/tools/non-voters-tool/utils';
import NonVotersTool from '../views/tools/NonVotersTool';
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
      Location: 'https://mygov.org.nz/tools/non-voters/MjAxNyxAbncsNTAsMA=='
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
    setParty: noop,
    setUnenrolled: noop,
    setVotes: noop,
    setYear: noop
  };

  callback(null, {
    statusCode: 200,
    headers: addHeaders({
      Link: '<https://mygov.org.nz/tools/non-voters>; rel="canonical"'
    }),
    body: render(NonVotersTool, props, {
      nav: 'tools/non-voters',
      title: 'Non-voters Tool - MyGov',
      description: 'This tool was created to allow users to evaluate the possible effects of hypothetical situations where non-voters had instead chosen to vote.',
      scripts: [
        '/js/non-voters-tool.js'
      ]
    })
  });
};
