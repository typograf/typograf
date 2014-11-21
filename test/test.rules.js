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
        var name = elem[0],
            tests = elem[1];

        it(name, function() {
            tests.forEach(function(as) {
                t.enable(name);
                assert.equal(executeRule(name, as[0]), as[1], as[0] + ' → ' + as[1]);
            });
        });
    });

    it('quotes lquot = lquot2 and rquot = rquot2', function() {
        var quotTests = [
            ['"Триллер “Закрытая школа” на СТС"', '«Триллер «Закрытая школа» на СТС»'],
            ['Триллер "Триллер “Закрытая школа” на СТС" Триллер', 'Триллер «Триллер «Закрытая школа» на СТС» Триллер'],
            ['"“Закрытая школа” на СТС"', '«Закрытая школа» на СТС»'],
            ['Триллер "“Закрытая школа” на СТС" Триллер', 'Триллер «Закрытая школа» на СТС» Триллер'],
            ['"Триллер “Закрытая школа"', '«Триллер «Закрытая школа»'],
            ['Триллер "Триллер “Закрытая школа" Триллер', 'Триллер «Триллер «Закрытая школа» Триллер']
        ];

        pushSettings('ru/quot', {
            lquot: '«',
            rquot: '»',
            lquot2: '«',
            rquot2: '»'
        });

        quotTests.forEach(function(el) {
            assert.equal(executeRule('ru/quot', el[0]), el[1]);
        });

        popSettings('ru/quot');
    });

    it('off -ru/optalign', function() {
        var tp = new Typograf({lang: 'ru'});

        tp
            .disable('*')
            .enable('-*');

        var optAlignTests = [
            '<span class="typograf-oa-sp-lquot"> </span>',
            '<span class="typograf-oa-lquot">«</span>',
            '<span class="typograf-oa-comma">,</span>',
            '<span class="typograf-oa-sp-lbracket"> </span>'
        ];

        optAlignTests.forEach(function(el) {
            assert.equal(tp.execute(el), el);
        });
    });
});
