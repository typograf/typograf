/**
 * Get a deep copy of a object.
 */
export function deepCopy<T>(data: T): T {
    return data && typeof data === 'object' ?
        JSON.parse(JSON.stringify(data)) :
        data;
}
