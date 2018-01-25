/**
 *
 * @param {number} value
 * @param {string} prefix
 * @returns {string}
 */
export function differenceClasses(value, prefix) {
  return value > 0 ? `${prefix || ''}increase` : (value < 0 ? `${prefix || ''}decrease` : '');
}

/**
 *
 * @param {number} value
 * @param {number} places
 * @returns {string}
 */
export function differenceValue(value, places = 3) {
  return value ? `${ value > 0 ? '+' : '' }${ value.toFixed(places) }` : '';
}

/**
 *
 * @param {number} value
 * @param {number} places
 * @returns {string}
 */
export function roundFloat(value, places = 3) {
  return value ? value.toFixed(places) : '';
}
