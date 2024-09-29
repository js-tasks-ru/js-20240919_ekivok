/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */


export const invertObj = obj => {
  if (!obj) { return; }
  const invertedObj = {};

  for (const key in obj) {
    invertedObj[obj[key]] = key;
  }
  return invertedObj;
}; 
