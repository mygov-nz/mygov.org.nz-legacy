import { resultSelector } from '../lib/tools/non-voters-tool/selectors';
import { hashToParams } from '../lib/tools/non-voters-tool/utils';

const noop = () => null;

/**
 * Non-voters Tool
 *
 * @param {*} req 
 * @param {*} res 
 */
export function nonVotersTool(req, res) {
  const state = hashToParams(req.params.hash);
  const props = resultSelector(state);
  const headers = {
    Link: '<https://mygov.org.nz/tools/non-voters>; rel="canonical"'
  };

  props.params = state;
  props.handlers = {
    setParty: noop,
    setUnenrolled: noop,
    setVotes: noop,
    setYear: noop
  };

  res.set(headers);
  res.render('tools/NonVotersTool', {
    layout: {
      nav: 'tools/non-voters',
      title: 'Non-voters Tool - MyGov',
      description: 'This tool was created to allow users to evaluate the possible effects of hypothetical situations where non-voters had instead chosen to vote.',
      scripts: [
        'js/non-voters-tool.js'
      ]
    },
    props
  });
}

/**
 * Non-voters Tool redirect
 *
 * @param {*} req 
 * @param {*} res 
 */
export function nonVotersToolRedirect(req, res) {
  res.redirect(302, '/tools/non-voters/MjAxNyxAbncsMjUsMA==');
}
