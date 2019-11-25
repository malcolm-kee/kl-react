export const currentYear = new Date().getFullYear();

export function noop() {
  // noop
}

/**
 *
 * @param {*} array
 * @returns {array is Array}
 */
export function isFilledArray(array) {
  return Array.isArray(array) && array.length > 0;
}

/**
 *
 * @param {string} singular
 * @param {number} count
 */
export const pluralize = (singular, count) =>
  count > 1 ? `${singular}s` : singular;
