/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */


export function sortStrings(arr, param = 'asc') {
  const localeCaseComparator = (a, b) => {
    return a.localeCompare(b, 'ru', { caseFirst: "upper" });
  };

  const sortDesc = (a, b) => localeCaseComparator(b, a);
  const sortAsc = (a, b) => localeCaseComparator(a, b);

  return [...arr].sort(param == "desc" ? sortDesc : sortAsc);
}