import atob from 'atob';
import btoa from 'btoa';
import { getParties, getYears } from '../../../data';

const parties = getParties();
const years = getYears();
const hashMap = {};

/**
 * Deserialise hash into a param object
 *
 * @param  {string} hash
 * @return {{}}
 */
export function hashToParams(hash) {
  if (hashMap[hash]) {
    return hashMap[hash];
  }

  const bits = atob(hash).split(',');

  let votes = parseFloat(bits[2]);
  if (0 < votes && 1 > votes) {
    votes = votes * 100;
  }
  votes = Math.round(votes);

  const params = {
    party: (years[bits[1]] !== undefined) ? bits[1] : '@nw',
    // unenrolled: !!parseInt(bits[3], 10),
    unenrolled: false,
    votes: (0 <= votes && 100 >= votes) ? votes : 50,
    year: (-1 < years.indexOf(bits[0])) ? bits[0] : '2017',
  };

  hashMap[hash] = params;

  return params;
}

/**
 * Serialise params into a hash string
 *
 * @param  {{}} params
 * @return {string}
 */
export function paramsToHash(params) {
  return btoa([
    params.year,
    params.party,
    params.votes,
    // params.unenrolled ? 1 : 0
    0
  ].join(','));
}
