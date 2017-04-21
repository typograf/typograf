Typograf._mix(Typograf, {
    /**
     * Get data for use in rules.
     *
     * @static
     * @param {string} key
     *
     * @returns {*}
     */
    getData: function(key) {
        return this._data[key];
    },
    /**
     * Set data for use in rules.
     *
     * @static
     * @param {string|Object} key
     * @param {*} [value]
     */
    setData: function(key, value) {
        if (typeof key === 'string') {
            this.addLocale(key);
            this._data[key] = value;
        } else if (typeof key === 'object') {
            Object.keys(key).forEach(function(k) {
                this.addLocale(k);
                this._data[k] = key[k];
            }, this);
        }
    },
    _data: {}
});

/**
 * Get data for use in rules.
 *
 * @param {string} key
 *
 * @returns {*}
 */
Typograf.prototype.getData = function(key) {
    var locale = this._sessionPrefs ? this._sessionPrefs.locale : this._prefs.locale;

    if (key.search('/') === -1) {
        if (key === 'char') {
            return locale.map(function(item) {
                return Typograf.getData(item + '/' + key);
            }).join('');
        } else {
            return Typograf.getData(locale[0] + '/' + key);
        }
    } else {
        return Typograf.getData(key);
    }
};
