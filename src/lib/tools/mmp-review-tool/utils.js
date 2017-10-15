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
  const threshold = parseInt(params[1], 10);

  return {
    year: (-1 < years.indexOf(params[0])) ? params[0] : '2017',
    threshold: (0 <= threshold && 100 >= threshold) ? threshold : 5,
    allowOverhang: !!parseInt(params[2], 10),
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
    params.allowOverhang ? 0 : 1,
    params.tagAlong ? 0 : 1,
    params.tagAlongSeats
  ].join(','));
}
