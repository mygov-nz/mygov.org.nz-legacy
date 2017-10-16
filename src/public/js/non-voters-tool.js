import render from 'lib/tools/common/render';
import * as actions from 'lib/tools/non-voters-tool/actions';
import { resultSelector } from 'lib/tools/non-voters-tool/selectors';
import store from 'lib/tools/non-voters-tool/store';
import NonVotersTool from 'views/tools/NonVotersTool';

/**
 *
 * @param {Function} dispatch
 * @returns {{}}
 */
function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      setParty: event => dispatch(actions.setParty(event.target.value)),
      setUnenrolled: event => dispatch(actions.setUnenrolled(event.target.checked)),
      setVotes: value => dispatch(actions.setVotes(value)),
      setYear: event => dispatch(actions.setYear(event.target.value))
    }
  };
}

render(NonVotersTool, store, resultSelector, mapDispatchToProps);
