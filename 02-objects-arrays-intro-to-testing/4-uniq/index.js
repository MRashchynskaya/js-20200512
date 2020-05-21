/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export const uniq = (arr) => {
  if (!arr || !arr.length) return [];
  return arr.filter((v, i) => arr.indexOf(v) === i);
};
