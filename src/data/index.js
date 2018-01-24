import elections from './elections';
import parties from './parties';

/**
 *
 * @param {string} year
 * @returns {IElection}
 */
export function getData(year: string): IElection {
    const data: IDataElection = elections[year];

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
 * @return {IDataParty} [description]
 */
export function getParties(): IDataParty {
  return parties;
}

/**
 *
 * @returns {string[]}
 */
export function getYears(): Array<string> {
    return Object.keys(elections).reverse();
}
