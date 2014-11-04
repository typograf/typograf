var assert = require('chai').assert,
    rules = require('./rules.js'),
    Typograf = require('../dist/typograf.js'),
    t = new Typograf({lang: 'ru'});

function executeRule(name, text) {
    var rules = Typograf.prototype._rules;
    
    rules.forEach(function(f) {
        if(f.name === name) {
            text = f.func.call(t, text, t._settings[f.name]);
        }
    });
    
    return text;
}

describe('rules', function() {
    rules.forEach(function(elem) {
        it(elem[0], function() {
            elem[1].forEach(function(as) {
                assert.equal(executeRule(elem[0], as[0]), as[1], as[0] + ' → ' + as[1]);
            });
        });
    });
});
