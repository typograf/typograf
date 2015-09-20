var assert = require('chai').assert,
    Typograf = require('../../build/typograf');

module.exports = {
    ruTests: function(name, tests) {
        describe(name, function() {
            tests.forEach(function(item) {
                it(item[0], function() {
                    var prefs = item[2] || {},
                        tp = new Typograf({
                            lang: 'ru',
                            enable: prefs.enable,
                            disable: prefs.disable
                        });

                    assert.equal(tp.execute(item[0]), item[1]);
                });
            });
        });
    },
    ruDoubleTests: function(name, tests) {
        describe(name, function() {
            tests.forEach(function(item) {
                it(item[0], function() {
                    var prefs = item[2] || {},
                        tp = new Typograf({
                            lang: 'ru',
                            enable: prefs.enable,
                            disable: prefs.disable
                        }),
                        result = tp.execute(item[0], prefs);

                    assert.equal(tp.execute(result), item[1]);
                });
            });
        });
    }
};
