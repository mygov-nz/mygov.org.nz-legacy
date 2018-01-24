import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import { hydrate } from 'react-dom';
import { connect, Provider } from 'react-redux';

/**
 * [view description]
 *
 * @param  {[type]} view               [description]
 * @param  {[type]} store              [description]
 * @param  {[type]} mapStateToProps    [description]
 * @param  {[type]} mapDispatchToProps [description]
 * @return {[type]}                    [description]
 */
export default function view(view, store, resultSelector, mapDispatchToProps) {
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

  const App = connect(mapStateToProps, mapDispatchToProps)(view);

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

}
