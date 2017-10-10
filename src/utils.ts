/**
 *
 * @param {number} value
 * @returns {string}
 */
export function differenceClasses(value: number): string {
  if (value > 0) {
    return 'increase';
  }

  if (value < 0) {
    return 'decrease';
  }

  return '';
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
