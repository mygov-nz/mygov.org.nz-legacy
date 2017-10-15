/**
 *
 * @param {number} value
 * @param {string} prefix
 * @returns {string}
 */
export function differenceClasses(value: number, prefix: string = ''): string {
  return value > 0 ? `${prefix}increase` : (value < 0 ? `${prefix}decrease` : '');
}

/**
 *
 * @param {number} value
 * @param {number} places
 * @returns {string}
 */
export function differenceValue(value: number, places: number = 3): string {
  return value ? `${ value > 0 ? '+' : '' }${ value.toFixed(places) }` : '';
}

/**
 *
 * @param {number} value
 * @param {number} places
 * @returns {string}
 */
export function roundFloat(value: number, places: number = 3): string {
  return value ? value.toFixed(places) : '';
}
