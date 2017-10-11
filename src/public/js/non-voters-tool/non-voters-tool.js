'use strict';

import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import history from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import store from './store';
import NonVotersTool from 'views/tools/NonVotersTool';
import { resultSelector } from './selectors';
import * as actions from './actions';

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
      setVotes: event => dispatch(actions.setVotes(event.target.value)),
      setYear: event => dispatch(actions.setYear(event.target.value))
    }
  };
}

/**
 *
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Route exact component={connect(mapStateToProps, mapDispatchToProps)(NonVotersTool)} />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

hydrate(createElement(Root, {
  store: store
}), document.getElementById('content'));
