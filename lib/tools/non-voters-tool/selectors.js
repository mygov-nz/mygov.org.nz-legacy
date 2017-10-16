import gallagher from 'gallagher';
import { createSelector } from 'reselect';
import sainteLague from 'saintelague';
import * as constants from './constants';
import { getData, getParties } from '../../../data';
import { forGallagher, forSainteLague, rowReducer, yearSelector } from '../common/selectors';

const params = {
  overhang: true,
  tagAlong: true,
  tagAlongSeats: 1,
  threshold: 0.05
};

const partySelector = state => state.party;
const unenrolledSelector = state => state.unenrolled;
const votesSelector = state => state.votes;

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
    const original = sainteLague(data.parties.map(forSainteLague), params);

    const allocate = Math.round((unenrolled ? (data.totalVoters - data.activeVoters) : (data.enrolledVoters - data.activeVoters)) * votes / 100);

    const rows = data.parties.map(row => {
      return {
        name: row[0],
        votes: row[0] !== party ? row[1] : row[1] + allocate,
        electorates: row[2] || 0
      };
    });

    if (party === constants.PARTY_NEW) {
      rows.push({
        name: constants.PARTY_NEW,
        votes: allocate,
        electorates: 0
      });
    } else if (party === constants.PARTY_NEW_NO_LIST) {
      rows.push({
        name: constants.PARTY_NEW_NO_LIST,
        votes: allocate,
        electorates: 0,
        listSize: 0
      });
    }

    const current = sainteLague(rows, params);

    const results = {
      totalVotes: current.reduce(rowReducer('votes'), 0),
      totalElectorateSeats: current.reduce(rowReducer('electorates'), 0),
      totalListSeats: current.reduce(rowReducer('lists'), 0),
      totalSeats: current.reduce(rowReducer('allocated'), 0),
      gallagherIndex: gallagher(current.map(forGallagher))
    };

    results.totalSeats = results.totalElectorateSeats + results.totalListSeats;
    results.seatDifference = results.totalSeats - (original.reduce(rowReducer('electorates'), 0) + original.reduce(rowReducer('lists'), 0));
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
        totalSeats: row.electorates + row.lists,
        seatDifference: (undefined !== original[i]) ? ((row.electorates + row.lists) - (original[i].electorates + original[i].lists)) : (row.electorates + row.lists)
      };
    });

    return results;
  }
);
