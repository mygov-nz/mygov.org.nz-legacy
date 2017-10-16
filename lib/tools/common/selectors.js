import { defaultMemoize } from 'reselect';

export const yearSelector = state => state.year;

/**
 * Converts data into correct format for Gallagher
 *
 * @param  {object} party
 * @return {object}
 */
export const forGallagher = party => {
  return {
    name: party.name,
    votes: party.votes,
    seats: party.allocated
  };
};

/**
 * Converts data into correct format for Sainté Lague
 *
 * @param  {object} party
 * @return {object}
 */
export const forSainteLague = party => {
  return {
    name: party[0],
    votes: party[1],
    electorates: party[2] || 0
  };
};

/**
 * //
 *
 * @param  {string} field
 * @return {Function}
 */
export const rowReducer = defaultMemoize(field => (total, row) => total + row[field]);
