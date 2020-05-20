/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(field) {
  return (obj) => {
    if (!Object.keys(obj).length) return undefined;
    let storage = obj;
    let path = field.split(".");
    for (let value of path) {
      storage = storage[value];
    }

    return storage;
  };
}
