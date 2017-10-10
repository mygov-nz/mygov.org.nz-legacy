import { createSelector } from 'reselect';
import { getData } from 'data';

const yearSelector = state => state.year;

export const dataSelector = createSelector(
  yearSelector,
  year => getData(year)
);
