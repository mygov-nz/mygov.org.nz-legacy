'use strict';

import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import history from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import store from './store';
import MMPReviewTool from 'views/tools/MMPReviewTool';
import { resultSelector } from './selectors';

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
    //
  };
}

/**
 *
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Route exact component={connect(mapStateToProps, mapDispatchToProps)(MMPReviewTool)} />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

hydrate(createElement(Root, {
  store: store
}), document.getElementById('content'));
