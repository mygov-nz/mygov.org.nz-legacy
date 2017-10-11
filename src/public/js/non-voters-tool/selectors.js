import { createSelector, defaultMemoize } from 'reselect';
import { getData, getParties } from 'data';
import gallagher from 'gallagher';
import sainteLague from 'saintelague';

const params = {
  overhang: true,
  tagAlong: true,
  tagAlongSeats: 1,
  threshold: 0.05
};

const partySelector = state => state.party;
const unenrolledSelector = state => state.unenrolled;
const votesSelector = state => state.votes;
const yearSelector = state => state.year;

/**
 * Converts data into correct format for Gallagher
 *
 * @param  {object} party
 * @return {object}
 */
const forGallagher = party => {
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
const forSainteLague = party => {
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
const rowReducer = defaultMemoize(field => (total, row) => total + row[field]);

/**
 * Result selector
 *
 * @type {Function}
 */
export const resultSelector = createSelector(
  partySelector,
  unenrolledSelector,
  votesSelector,
  yearSelector,
  (party, unenrolled, votes, year) => {
    const data = getData(year);
    const parties = getParties();
    const current = sainteLague(data.parties.map(forSainteLague), params);
    const original = sainteLague(data.parties.map(forSainteLague), params);

    const results = {
      totalVotes: current.reduce(rowReducer('votes'), 0),
      totalElectorateSeats: current.reduce(rowReducer('electorates'), 0),
      totalListSeats: current.reduce(rowReducer('lists'), 0),
      totalSeats: current.reduce(rowReducer('allocated'), 0),
      gallagherIndex: gallagher(current.map(forGallagher))
    };

    results.seatDifference = results.totalSeats - original.reduce(rowReducer('allocated'), 0);
    results.gallagherIndexDifference = results.gallagherIndex - gallagher(original.map(forGallagher));

    results.rows = current.map((row, i) => {
      const party = parties[row.name];

      return {
        id: row.name,
        name: party[0],
        swatch: party[1],
        votes: row.votes,
        electorateSeats: row.electorates,
        listSeats: row.lists,
        totalSeats: row.allocated,
        seatDifference: row.allocated - original[i].allocated
      };
    });

    return results;
  }
);
