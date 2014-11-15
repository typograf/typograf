var assert = require('chai').assert,
    rules = require('./rules.js'),
    Typograf = require('../dist/typograf.js'),
    t = new Typograf({lang: 'ru'}),
    _settings;
    
function pushSettings(ruleName, settings) {
    _settings = {};
    
    Object.keys(settings).forEach(function(key) {
        _settings[key] = t.setting(ruleName, key);
        t.setting(ruleName, key, settings[key]);
    });
}

function popSettings(ruleName) {
    Object.keys(_settings).forEach(function(key) {
        t.setting(ruleName, key, _settings[key]);
    });
}

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
    
    
    it('quotes lquot = lquot2 and rquot = rquot2', function() {
        pushSettings('ru/quot', {
            lquot: '«',
            rquot: '»',
            lquot2: '«',
            rquot2: '»'
        });
        
        assert.equal(executeRule('ru/quot', '"Триллер “Закрытая школа” на СТС"'), '«Триллер «Закрытая школа» на СТС»');
        assert.equal(executeRule('ru/quot', 'Триллер "Триллер “Закрытая школа” на СТС" Триллер'), 'Триллер «Триллер «Закрытая школа» на СТС» Триллер');
        assert.equal(executeRule('ru/quot', '"“Закрытая школа” на СТС"'), '«Закрытая школа» на СТС»');
        assert.equal(executeRule('ru/quot', 'Триллер "“Закрытая школа” на СТС" Триллер'), 'Триллер «Закрытая школа» на СТС» Триллер');
        assert.equal(executeRule('ru/quot', '"Триллер “Закрытая школа"'), '«Триллер «Закрытая школа»');
        assert.equal(executeRule('ru/quot', 'Триллер "Триллер “Закрытая школа" Триллер'), 'Триллер «Триллер «Закрытая школа» Триллер');

        popSettings('ru/quot');
    });
    
});
