/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export const trimSymbols = (string, limit) => {
  if (!string || limit === 0) return "";
  if (!limit) return string;

  const symbols = string.split("");
  let counter = 0;
  let output = symbols.reduce((result, current) => {
    if (result[result.length - 1] === current) {
      return ++counter < limit ? result + current : result;
    } else {
      counter = 0;
      return result + current;
    }
  });
  return output;
};
