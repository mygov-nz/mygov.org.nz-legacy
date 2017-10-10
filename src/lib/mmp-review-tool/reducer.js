import * as constants from './constants';
import { getData } from 'data';

const initialState = {
  year: '2017',
  data: getData('2017')
};

/**
 *
 * @param {{}} state
 * @param {{ type: string }} action
 * @returns {{}}
 */
export default function reducer(state = initialState, action) {
  //

  return state;
}
