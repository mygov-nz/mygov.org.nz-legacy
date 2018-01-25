import createHistory from 'history/createBrowserHistory';
import debounce from 'lodash.debounce';
import { createStore } from 'redux';
import * as constants from './constants';
import { hashToParams, paramsToHash } from './utils';

const history = createHistory({
  basename: '/tools/non-voters/'
});

const store = createStore((state = {}, action) => {
  switch (action.type) {

    case constants.LOAD_STATE:
      return Object.assign({}, state, action.state);

    case constants.SET_PARTY:
      return Object.assign({}, state, {
        party: action.id
      });

    case constants.SET_UNENROLLED:
      return Object.assign({}, state, {
        unenrolled: action.unenrolled
      });

    case constants.SET_VOTES:
      return Object.assign({}, state, {
        votes: action.votes
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
