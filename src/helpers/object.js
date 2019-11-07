/**
 * Get a deep copy of a object.
 *
 * @param {*} obj
 *
 * @returns {*}
 */
export function deepCopy(obj) {
    return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}
