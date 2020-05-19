/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let resultObject = {};

  for (let [k, v] of Object.entries(obj)) {
    fields.includes(k) ? (resultObject[k] = v) : null;
  }

  return resultObject;
};
