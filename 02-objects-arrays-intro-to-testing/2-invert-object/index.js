/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const resultObject = {};
  if (!obj) return undefined;
  for (let [k, v] of Object.entries(obj)) {
    resultObject[v] = k;
  }
  return resultObject;
}
