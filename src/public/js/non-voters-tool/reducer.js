import * as constants from './constants';

const initialState = {
  party: '@no',
  unenrolled: true,
  votes: 50,
  year: '2017'
};

/**
 *
 * @param {{}} state
 * @param {{ type: string }} action
 * @returns {{}}
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {

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
}
