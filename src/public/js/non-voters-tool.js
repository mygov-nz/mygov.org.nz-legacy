'use strict';

import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import * as actions from 'lib/tools/non-voters-tool/actions';
import history from 'lib/tools/non-voters-tool/history';
import { resultSelector } from 'lib/tools/non-voters-tool/selectors';
import store from 'lib/tools/non-voters-tool/store';
import NonVotersTool from 'views/tools/NonVotersTool';

/**
 *
 * @param {{}} state
 * @returns {{}}
 */
function mapStateToProps(state) {
  const props = resultSelector(state.params);

  props.params = state.params;

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

/**
 *
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route exact component={connect(mapStateToProps, mapDispatchToProps)(NonVotersTool)} />
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

hydrate(createElement(Root, {
  store: store
}), document.getElementById('content'));
