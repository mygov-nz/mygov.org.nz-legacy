import * as constants from './constants';

/**
 * Sets year value
 *
 * @param {string} id
 * @returns {{ type: string, id: string }}
 */
export function setParty(id) {
  return {
    type: constants.SET_PARTY,
    id
  };
}

/**
 * Sets year value
 *
 * @param {bool} unenrolled
 * @returns {{ type: string, unenrolled: bool }}
 */
export function setUnenrolled(unenrolled) {
  return {
    type: constants.SET_UNENROLLED,
    unenrolled
  };
}

/**
 * Sets year value
 *
 * @param {number} year
 * @returns {{ type: string, votes: number }}
 */
export function setVotes(votes) {
  return {
    type: constants.SET_VOTES,
    votes
  };
}

/**
 * Sets year value
 *
 * @param {string} year
 * @returns {{ type: string, year: string }}
 */
export function setYear(year) {
  return {
    type: constants.SET_YEAR,
    year
  };
}
