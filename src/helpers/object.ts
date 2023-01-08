/**
 * Get a deep copy of a object.
 */
export function deepCopy<T>(obj: T): T {
    return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}
