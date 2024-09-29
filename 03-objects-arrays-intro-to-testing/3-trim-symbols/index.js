/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size = null) {
  if (size === null) {return string;} 
  if (size === 0) {return '';}
  let trimmedString = '';
  let counter = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string?.[i + 1]) {counter++;} 
    if (counter === size) {
      counter = 0;
      continue;
    } else {
      trimmedString += string[i];
    }
  }
  return trimmedString;
}
