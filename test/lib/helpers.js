'use strict';

const assert = require('chai').assert;
const Typograf = require('../../build/typograf');

module.exports = {
    test: function(name, tests, mainPrefs) {
        describe(name, function() {
            tests.forEach(function(item) {
                it(item[0], function() {
                    const [before, after, localPrefs] = item;
                    const prefs = Object.assign({}, mainPrefs, localPrefs);

                    if (!prefs.locale) {
                        prefs.locale = ['ru', 'en-US'];
                    }

                    const tp = new Typograf(prefs);
                    assert.equal(tp.execute(before), after);
                });
            });
        });
    },
    doubleTest: function(name, tests, mainPrefs) {
        describe(name, function() {
            tests.forEach(function(item) {
                it(item[0], function() {
                    const [before, after, localPrefs] = item;
                    const prefs = Object.assign({}, mainPrefs, localPrefs);

                    if (!prefs.locale) {
                        prefs.locale = ['ru', 'en-US'];
                    }

                    const tp = new Typograf(prefs);
                    const result = tp.execute(before, prefs);
                    assert.equal(result, after, 'first step');

                    const result2 = tp.execute(result, prefs);
                    assert.equal(result2, after, 'second step');
                });
            });
        });
    }
};
