import elections from './elections';
import parties from './parties';

/**
 *
 * @param {IDataElectionRow} row
 * @return {IParty}
 */
function expandRow(row: IDataElectionRow): IParty {
    const id: string = row[0];
    const party: IDataParty = parties[id];

    return {
        id,
        name: party[0],
        swatch: party[1],
        votes: row[1],
        electorates: row[2] || 0
    };
}

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
        parties: data.r.map(expandRow)
    };
}

/**
 *
 * @returns {string[]}
 */
export function getYears(): Array<string> {
    return Object.keys(elections).reverse();
}
