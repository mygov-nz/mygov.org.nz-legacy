import atob from 'atob';
import btoa from 'btoa';
import { getParties, getYears } from '../../../data';

const parties = getParties();
const years = getYears();

/**
 * [hashToParams description]
 *
 * @param  {[type]} hash [description]
 * @return {[type]}      [description]
 */
export function hashToParams(hash) {
  const params = atob(hash).split(',');

  let votes = parseFloat(params[2]);
  if (0 < votes && 1 > votes) {
    votes = votes * 100;
  }
  votes = Math.round(votes);

  return {
    party: (years[params[1]] !== undefined) ? params[1] : '@nw',
    // unenrolled: !!parseInt(params[3], 10),
    unenrolled: false,
    votes: (0 <= votes && 100 >= votes) ? votes : 50,
    year: (-1 < years.indexOf(params[0])) ? params[0] : '2017',
  };
}

/**
 * [paramsToHash description]
 *
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
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
