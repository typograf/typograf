import Typograf from './typograf';

Typograf._mix(Typograf, {
    /**
     * Add a locale.
     *
     * @static
     *
     * @param {string} locale
     */
    addLocale: function(locale) {
        var code = (locale || '').split('/')[0];
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
    getLocales: function() {
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
    hasLocale: function(locale) {
        return locale === 'common' || this._locales.indexOf(locale) !== -1;
    },
    _prepareLocale: function(locale1, locale2) {
        var locale = locale1 || locale2,
            result = locale;

        if (!Array.isArray(locale)) { result = [locale]; }

        return result;
    },
    _locales: []
});
