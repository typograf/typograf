import { addLocale } from './locale';

const data = {};

/**
 * Get data for use in rules.
 *
 * @param {string} key
 *
 * @returns {*}
 */
export function getData(key) {
    return data[key];
}

/**
 * Set data for use in rules.
 *
 * @param {string|Object} key
 * @param {*} [value]
 */
export function setData(key, value) {
    if (typeof key === 'string') {
        addLocale(key);
        data[key] = value;
    } else if (typeof key === 'object') {
        Object.keys(key).forEach((k) => {
            addLocale(k);
            data[k] = key[k];
        });
    }
}
