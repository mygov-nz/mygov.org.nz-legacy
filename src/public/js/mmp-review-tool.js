'use strict';

import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import * as actions from 'lib/tools/mmp-review-tool/actions';
import history from 'lib/tools/mmp-review-tool/history';
import { resultSelector } from 'lib/tools/mmp-review-tool/selectors';
import store from 'lib/tools/mmp-review-tool/store';
import MMPReviewTool from 'views/tools/MMPReviewTool';

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
      setOverhang: event => dispatch(actions.setOverhang(event.target.checked)),
      setTagAlong: event => dispatch(actions.setTagAlong(event.target.checked)),
      setTagAlongSeats: event => dispatch(actions.setTagAlongSeats(event.target.value)),
      setThreshold: event => dispatch(actions.setThreshold(event.target.value)),
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
      <Route path='/tools/mmp-review/:token' component={connect(mapStateToProps, mapDispatchToProps)(MMPReviewTool)} />
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

hydrate(createElement(Root, {
  store: store
}), document.getElementById('content'));
