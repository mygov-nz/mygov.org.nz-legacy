import * as constants from './constants';

/**
 * Sets overhang value
 *
 * @param {bool} overhang
 * @returns {{ type: string, overhang: bool }}
 */
export function setOverhang(overhang) {
  return {
    type: constants.SET_OVERHANG,
    overhang
  };
}

/**
 * Sets tagAlong value
 *
 * @param {bool} tagAlong
 * @returns {{ type: string, tagAlong: bool }}
 */
export function setTagAlong(tagAlong) {
  return {
    type: constants.SET_TAG_ALONG,
    tagAlong
  };
}

/**
 * Sets tagAlongSeats value
 *
 * @param {number} tagAlongSeats
 * @returns {{ type: string, tagAlongSeats: number }}
 */
export function setTagAlongSeats(tagAlongSeats) {
  return {
    type: constants.SET_TAG_ALONG_SEATS,
    tagAlongSeats
  };
}

/**
 * Sets threshold value
 *
 * @param {number} threshold
 * @returns {{ type: string, threshold: number }}
 */
export function setThreshold(threshold) {
  return {
    type: constants.SET_THRESHOLD,
    threshold
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
