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
