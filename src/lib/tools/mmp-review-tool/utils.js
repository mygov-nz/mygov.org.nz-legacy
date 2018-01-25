import atob from 'atob';
import btoa from 'btoa';
import { getYears } from '../../../data';

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
  const tagAlongSeats = parseInt(bits[4], 10);

  let threshold = parseFloat(bits[1]);
  if (0 < threshold && 1 > threshold) {
    threshold = threshold * 100;
  }
  threshold = Math.round(threshold);

  const params = {
    year: (-1 < years.indexOf(bits[0])) ? bits[0] : '2017',
    threshold: (0 <= threshold && 100 >= threshold) ? threshold : 2,
    overhang: !!parseInt(bits[2], 10),
    tagAlong: !!parseInt(bits[3], 10),
    tagAlongSeats: (0 <= tagAlongSeats && 120 >= tagAlongSeats) ? tagAlongSeats : 1
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
    params.threshold,
    params.overhang ? 1 : 0,
    params.tagAlong ? 1 : 0,
    params.tagAlongSeats
  ].join(','));
}
