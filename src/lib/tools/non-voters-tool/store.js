import { createStore } from 'redux';
import * as constants from './constants';

const initialState = {
  party: '@nw',
  unenrolled: false,
  votes: 50,
  year: '2017'
};

const store = createStore((state = initialState, action) => {
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

export default store;
