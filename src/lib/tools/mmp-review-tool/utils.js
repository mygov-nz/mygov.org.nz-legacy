import atob from 'atob';
import btoa from 'btoa';
import { getYears } from '../../../data';

const years = getYears();

/**
 * [hashToParams description]
 *
 * @param  {[type]} hash [description]
 * @return {[type]}      [description]
 */
export function hashToParams(hash) {
  const params = atob(hash).split(',');
  const tagAlongSeats = parseInt(params[4], 10);

  let threshold = parseFloat(params[1]);
  if (0 < threshold && 1 > threshold) {
    threshold = threshold * 100;
  }
  threshold = Math.round(threshold);

  return {
    year: (-1 < years.indexOf(params[0])) ? params[0] : '2017',
    threshold: (0 <= threshold && 100 >= threshold) ? threshold : 2,
    overhang: !!parseInt(params[2], 10),
    tagAlong: !!parseInt(params[3], 10),
    tagAlongSeats: (0 <= tagAlongSeats && 120 >= tagAlongSeats) ? tagAlongSeats : 1
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
    params.threshold,
    params.overhang ? 1 : 0,
    params.tagAlong ? 1 : 0,
    params.tagAlongSeats
  ].join(','));
}
