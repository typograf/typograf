const locales = [];    

/**
 * Add a locale.
 *
 * @param {string} locale
 */
export function addLocale(locale) {
    const code = (locale || '').split('/')[0];
    if (code && code !== 'common' && !hasLocale(code)) {
        locales.push(code);
        locales.sort();
    }
}

/**
 * Get locales.
 *
 * @returns {Array}
 */
export function getLocales() {
    return locales;
}

/**
 * Has a locale.
*
 * @param {string} locale
 *
 * @returns {boolean}
 */
export function hasLocale(locale) {
    return locale === 'common' || locales.indexOf(locale) !== -1;
}

export function prepareLocale(locale1, locale2) {
    const locale = locale1 || locale2;
    let result = locale;

    if (!Array.isArray(locale)) { result = [ locale ]; }

    return result;
}
