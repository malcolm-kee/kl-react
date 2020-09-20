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

export const groupBy = (array, getKey) => {
  if (!isFilledArray) {
    return [];
  }

  const resultByKey = {};

  array.forEach((item) => {
    const key = getKey(item);
    if (resultByKey[key]) {
      resultByKey[key].push(item);
    } else {
      resultByKey[key] = [item];
    }
  });

  return Object.keys(resultByKey).map((key) => [key, resultByKey[key]]);
};

/**
 *
 * @param {string} value
 */
export const titleCase = (value) => {
  if (!value) {
    return value;
  }

  return value[0].toUpperCase() + value.substring(1).toLowerCase();
};
