import elections from './elections';
import parties from './parties';

/**
 *
 * @param {object} value
 * @return {object}
 */
function getParty(value) {
    const id = value[0];
    const party = parties[id];

    return {
        id,
        name: party[0],
        swatch: party[1],
        votes: value[1],
        electorates: value[2] || 0
    };
}

/**
 *
 * @param {string} year
 * @returns {object}
 */
export function getData(year) {
    const data = elections[year];

    if (undefined === data) {
        throw new Error('Year not found');
    }

    return {
        totalVoters: data.t,
        enrolledVoters: data.e,
        activeVoters: data.v,
        parties: data.r.map(getParty)
    };
}

/**
 *
 * @returns {string[]}
 */
export function getYears() {
    return Object.keys(elections);
}
