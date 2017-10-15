'use strict';

import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';
import * as actions from 'lib/tools/non-voters-tool/actions';
import { resultSelector } from 'lib/tools/non-voters-tool/selectors';
import store from 'lib/tools/non-voters-tool/store';
import NonVotersTool from 'views/tools/NonVotersTool';

/**
 *
 * @param {{}} state
 * @returns {{}}
 */
function mapStateToProps(state) {
  const props = resultSelector(state);

  props.params = state;

  return props;
}

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


const App = connect(mapStateToProps, mapDispatchToProps)(NonVotersTool);

/**
 *
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

hydrate(createElement(Root, {
  store: store
}), document.getElementById('content'));
