import elections from './elections';
import parties from './parties';
import mygov from '../../typings';

/**
 *
 * @param {string} year
 * @returns {mygov.IElection}
 */
export function getData (year: string): mygov.IElection {
  const data: mygov.IDataElection = elections[year];

  if (undefined === data) {
    throw new Error('Year not found');
  }

  return {
    totalVoters: data.t,
    enrolledVoters: data.e,
    activeVoters: data.v,
    parties: data.r
  };
}

/**
 *
 * @return {mygov.IDataParty} [description]
 */
export const getParties: () => mygov.IDataParties = (): mygov.IDataParties => parties;

/**
 *
 * @returns {string[]}
 */
export const getYears: () => string[] = (): string[] => Object.keys(elections).reverse();
