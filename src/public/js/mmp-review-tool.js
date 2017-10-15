'use strict';

import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';
import * as actions from 'lib/tools/mmp-review-tool/actions';
import { resultSelector } from 'lib/tools/mmp-review-tool/selectors';
import store from 'lib/tools/mmp-review-tool/store';
import MMPReviewTool from 'views/tools/MMPReviewTool';

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
      setOverhang: event => dispatch(actions.setOverhang(event.target.checked)),
      setTagAlong: event => dispatch(actions.setTagAlong(event.target.checked)),
      setTagAlongSeats: event => dispatch(actions.setTagAlongSeats(event.target.value)),
      setThreshold: event => dispatch(actions.setThreshold(event.target.value)),
      setYear: event => dispatch(actions.setYear(event.target.value))
    }
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(MMPReviewTool);

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
