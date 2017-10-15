import { createStore } from 'redux';
import * as constants from './constants';

const initialState = {
  overhang: false,
  tagAlong: false,
  tagAlongSeats: 1,
  threshold: 2,
  year: '2017'
};

const store = createStore((state = initialState, action) => {
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

export default store;
