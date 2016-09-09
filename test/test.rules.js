'use strict';

const assert = require('chai').assert;
const r = require('../build/rules');
const tests = r.tests;
const innerTests = r.innerTests;
const Typograf = require('../build/typograf');
const lang = 'ru';
const t = new Typograf({lang: lang});

let _settings;

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
    const rules = t._rules;

    t._lang = lang;
    rules.forEach(function(f) {
        if (f.name === name) {
            text = f.handler.call(t, text, t._settings[f.name]);
        }
    });

    return text;
}

function executeInnerRule(name, text) {
    const rules = t._innerRules;

    rules.forEach(function(f) {
        if (f.name === name) {
            text = f.handler.call(t, text, t._settings[f.name]);
        }
    });

    return text;
}

function getLang(name, item) {
    return item[2] ? item[2] : name.split(/\//)[0];
}

describe('inner rules', function() {
    innerTests.forEach(function(elem) {
        const name = elem[0];
        it(name, function() {
            elem[1].forEach(function(as) {
                t.enable(name);
                assert.equal(executeInnerRule(name, as[0]), as[1], as[0] + ' → ' + as[1]);
            });
        });
    });
});

describe('rules', function() {
    tests.forEach(function(elem) {
        const name = elem[0];
        it(name, function() {
            elem[1].forEach(function(as) {
                const itTypograf = new Typograf(as[2]);
                itTypograf.disable('*').enable(name);
                const result = itTypograf.execute(as[0], {lang: getLang(name, as)});
                assert.equal(result, as[1], as[0] + ' → ' + as[1]);
            });
        });
    });
});

describe('rules, double execute', function() {
    tests.forEach(function(elem) {
        const name = elem[0];
        it(name, function() {
            elem[1].forEach(function(as) {
                const itTypograf = new Typograf(as[2]);
                itTypograf.disable('*').enable(name);

                let result = itTypograf.execute(as[0], {lang: getLang(name, as)});
                assert.equal(result, as[1], as[0] + ' → ' + as[1]);

                if (!itTypograf._getRule(name).disabled) {
                    result = itTypograf.execute(result, {lang: getLang(name, as)});
                    assert.equal(result, as[1], as[0] + ' → ' + as[1]);
                }
            });
        });
    });
});

describe('common specific tests', function() {
    it('enable common/html/stripTags', function() {
        const tp = new Typograf();
        tp.enable('common/html/stripTags');

        const tagTests = [
            ['<p align="center">Hello world!</p> <a href="/">Hello world!</a>\n\n<pre>Hello world!</pre>',
            'Hello world! Hello world!\n\nHello world!'],
            ['<p align="center" Hello world!</p>', '']
        ];

        tagTests.forEach(function(el) {
            assert.equal(tp.execute(el[0]), el[1]);
        });
    });

    it('should enable common/html/escape', function() {
        const tp = new Typograf();
        tp.enable('common/html/escape');

        const escapeTests = [
            ['<p align="center">\nHello world!\n</p>',
            '&lt;p align=&quot;center&quot;&gt;\nHello world!\n&lt;&#x2F;p&gt;']
        ];

        escapeTests.forEach(function(el) {
            assert.equal(tp.execute(el[0]), el[1]);
        });
    });
});

describe('russian specific tests', function() {
    it('quotes lquote = lquote2 and rquote = rquote2', function() {
        const quotTests = [
            ['"Триллер “Закрытая школа” на СТС"', '«Триллер «Закрытая школа» на СТС»'],
            ['Триллер "Триллер “Закрытая школа” на СТС" Триллер', 'Триллер «Триллер «Закрытая школа» на СТС» Триллер'],
            ['"“Закрытая школа” на СТС"', '«Закрытая школа» на СТС»'],
            ['Триллер "“Закрытая школа” на СТС" Триллер', 'Триллер «Закрытая школа» на СТС» Триллер'],
            ['"Триллер “Закрытая школа"', '«Триллер «Закрытая школа»'],
            ['Триллер "Триллер “Закрытая школа" Триллер', 'Триллер «Триллер «Закрытая школа» Триллер']
        ];

        pushSettings('ru/punctuation/quote', {
            lquote: '«',
            rquote: '»',
            lquote2: '«',
            rquote2: '»'
        });

        quotTests.forEach(function(el) {
            assert.equal(executeRule('ru/punctuation/quote', el[0]), el[1]);
        });

        popSettings('ru/quote');
    });

    it('ru/optalign', function() {
        const tp = new Typograf({lang: 'ru'});
        tp.enable('ru/optalign/*');

        [
            [
                '<p>"что-то, где-то!"</p>',
                '<p><span class="typograf-oa-n-lquote">«</span>что-то<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</p>'
            ]
        ].forEach(function(el) {
            assert.equal(tp.execute(el[0]), el[1]);
        });
    });

    it('shoult disable ru/optalign', function() {
        const tp = new Typograf({lang: 'ru'});
        tp.disable('*');

        [
            '<span class="typograf-oa-sp-lquot"> </span>',
            '<span class="typograf-oa-lquot">«</span>',
            '<span class="typograf-oa-comma">,</span>',
            '<span class="typograf-oa-sp-lbracket"> </span>'
        ].forEach(function(el) {
            assert.equal(tp.execute(el), el);
        });
    });
});
