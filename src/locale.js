import Typograf from './typograf';

Typograf._mix(Typograf, {
    /**
     * Add a locale.
     *
     * @static
     *
     * @param {string} locale
     */
    addLocale(locale) {
        const code = (locale || '').split('/')[0];
        if (code && code !== 'common' && !this.hasLocale(code)) {
            this._locales.push(code);
            this._locales.sort();
        }
    },
    /**
     * Get locales.
     *
     * @static
     *
     * @returns {Array}
     */
    getLocales() {
        return this._locales;
    },
    /**
     * Has a locale.
     *
     * @static
     *
     * @param {string} locale
     *
     * @returns {boolean}
     */
    hasLocale(locale) {
        return locale === 'common' || this._locales.indexOf(locale) !== -1;
    },
    _prepareLocale(locale1, locale2) {
        const locale = locale1 || locale2;
        let result = locale;

        if (!Array.isArray(locale)) { result = [ locale ]; }

        return result;
    },
    _locales: []
});
