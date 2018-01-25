import createHistory from 'history/createBrowserHistory';
import debounce from 'lodash.debounce';
import { createStore } from 'redux';
import * as constants from './constants';
import { hashToParams, paramsToHash } from './utils';

const history = createHistory({
  basename: '/tools/mmp-review/'
});

const store = createStore((state = {}, action) => {
  switch (action.type) {

    case constants.LOAD_STATE:
      return Object.assign({}, state, action.state);

    case constants.SET_OVERHANG:
      return Object.assign({}, state, {
        overhang: action.overhang
      });

    case constants.SET_TAG_ALONG:
      return Object.assign({}, state, {
        tagAlong: action.tagAlong
      });

    case constants.SET_TAG_ALONG_SEATS:
      return Object.assign({}, state, {
        tagAlongSeats: action.tagAlongSeats
      });

    case constants.SET_THRESHOLD:
      return Object.assign({}, state, {
        threshold: action.threshold
      });

    case constants.SET_YEAR:
      return Object.assign({}, state, {
        year: action.year
      });

  }

  return state;
});

store.subscribe(debounce(() => {
  const state = store.getState();
  const hash = paramsToHash(state);

  if (hash !== history.location.pathname.slice(1)) {
    history.push(hash, state);
  }
}, 1000));

history.listen((location, action) => {
  if (location.state === undefined) {
    return;
  }

  if (action !== 'POP' && action !== 'REPLACE') {
    return;
  }

  store.dispatch({
    type: constants.LOAD_STATE,
    state: location.state
  });
});

const hash = history.location.pathname.slice(1);

history.replace(hash, hashToParams(hash));

export default store;
