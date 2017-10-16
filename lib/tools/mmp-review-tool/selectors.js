import gallagher from 'gallagher';
import { createSelector } from 'reselect';
import sainteLague from 'saintelague';
import { getData, getParties } from '../../../data';
import { forGallagher, forSainteLague, rowReducer, yearSelector } from '../common/selectors';

const overhangSelector = state => state.overhang;
const tagAlongSelector = state => state.tagAlong;
const tagAlongSeatsSelector = state => state.tagAlongSeats;
const thresholdSelector = state => state.threshold;

/**
 * Calculation selector
 *
 * @type {Function}
 */
const calculationSelector = createSelector(
  yearSelector,
  thresholdSelector,
  overhangSelector,
  tagAlongSelector,
  tagAlongSeatsSelector,
  (year, threshold, overhang, tagAlong, tagAlongSeats) => {
    return sainteLague(getData(year).parties.map(forSainteLague), {
      overhang: overhang,
      seats: 120,
      tagAlong: tagAlong,
      tagAlongSeats: tagAlongSeats,
      threshold: threshold / 100
    });
  }
);

/**
 * Result selector
 *
 * @type {Function}
 */
export const resultSelector = createSelector(
  yearSelector,
  calculationSelector,
  (year, current) => {
    const parties = getParties();
    const original = calculationSelector({
      overhang: true,
      seats: 120,
      tagAlong: true,
      tagAlongSeats: 1,
      threshold: 5,
      year: year
    });

    const results = {
      totalVotes: current.reduce(rowReducer('votes'), 0),
      totalElectorateSeats: current.reduce(rowReducer('electorates'), 0),
      totalListSeats: current.reduce(rowReducer('lists'), 0),
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
        totalSeats: row.allocated,
        seatDifference: row.allocated - original[i].allocated
      };
    });

    return results;
  }
);
