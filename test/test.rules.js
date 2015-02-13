var assert = require('chai').assert,
    r = require('./rules'),
    tests = r.tests,
    innerTests = r.innerTests,
    Typograf = require('../dist/typograf'),
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

function executeInnerRule(name, text) {
    var rules = Typograf.prototype._innerRules;

    rules.forEach(function(f) {
        if(f.name === name) {
            text = f.func.call(t, text, t._settings[f.name]);
        }
    });

    return text;
}

describe('inner rules', function() {
    innerTests.forEach(function(elem) {
        var name = elem[0];
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
        var name = elem[0];
        it(name, function() {
            elem[1].forEach(function(as) {
                t.enable(name);
                assert.equal(executeRule(name, as[0]), as[1], as[0] + ' → ' + as[1]);
            });
        });
    });
});

describe('common specific tests', function() {
    it('enable common/html/stripTags', function() {
        var tp = new Typograf();
        tp.enable('common/html/stripTags');

        var tagTests = [
            ['<p align="center">Hello world!</p> <a href="/">Hello world!</a>\n\n<pre>Hello world!</pre>',
            'Hello world! Hello world!\n\nHello world!'],
            ['<p align="center" Hello world!</p>', '']
        ];

        tagTests.forEach(function(el) {
            assert.equal(tp.execute(el[0]), el[1]);
        });
    });
    
    it('enable common/html/escape', function() {
        var tp = new Typograf();
        tp.enable('common/html/escape');

        var escapeTests = [
            ['<p align="center">\nHello world!\n</p>',
            '&lt;p align=&quot;center&quot;&gt;\nHello world!\n&lt;&#x2F;p&gt;']
        ];

        escapeTests.forEach(function(el) {
            assert.equal(tp.execute(el[0]), el[1]);
        });
    });
});

describe('ru specific tests', function() {
    it('quotes lquot = lquot2 and rquot = rquot2', function() {
        var quotTests = [
            ['"Триллер “Закрытая школа” на СТС"', '«Триллер «Закрытая школа» на СТС»'],
            ['Триллер "Триллер “Закрытая школа” на СТС" Триллер', 'Триллер «Триллер «Закрытая школа» на СТС» Триллер'],
            ['"“Закрытая школа” на СТС"', '«Закрытая школа» на СТС»'],
            ['Триллер "“Закрытая школа” на СТС" Триллер', 'Триллер «Закрытая школа» на СТС» Триллер'],
            ['"Триллер “Закрытая школа"', '«Триллер «Закрытая школа»'],
            ['Триллер "Триллер “Закрытая школа" Триллер', 'Триллер «Триллер «Закрытая школа» Триллер']
        ];

        pushSettings('ru/punctuation/quot', {
            lquot: '«',
            rquot: '»',
            lquot2: '«',
            rquot2: '»'
        });

        quotTests.forEach(function(el) {
            assert.equal(executeRule('ru/punctuation/quot', el[0]), el[1]);
        });

        popSettings('ru/quot');
    });

    it('ru/optalign', function() {
        var tp = new Typograf({lang: 'ru'});
        tp.enable('ru/optalign/*');

        [
            [
                '<p>"что-то, где-то!"</p>',
                '<p><span class="typograf-oa-n-lquot">«</span>что-то<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</p>'
            ]
        ].forEach(function(el) {
            assert.equal(tp.execute(el[0]), el[1]);
        });
    });

    it('off ru/optalign', function() {
        var tp = new Typograf({lang: 'ru'});
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
