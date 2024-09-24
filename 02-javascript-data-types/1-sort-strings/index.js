/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const sortedArr = [...arr];

    const localeCaseComparator = (a, b) => {
        return a.localeCompare(b, 'ru', { caseFirst: "upper" })
    }

    let orderedComparator = (a, b) => localeCaseComparator(a, b);
    if (param == "desc") {
        orderedComparator = (a, b) => localeCaseComparator(b, a)
    }

    return sortedArr.sort(orderedComparator);
}