var assert = require('chai').assert,
    Typograf = require('../build/typograf'),
    ruTests = [
        [
            '<p>"<strong>Hello</strong> World!"</p>',
            '<p>«<strong>Hello</strong> World!»</p>'
        ],
        [
            '<p>"<strong>Hello</strong> World!"</p>\n<p>"<strong>Hello</strong> World!"</p>',
            '<p>«<strong>Hello</strong> World!»</p>\n<p>«<strong>Hello</strong> World!»</p>'
        ]
    ];

describe('ru/github bugs', function() {
    ruTests.forEach(function(item) {
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

describe('ru/github bugs, double execute', function() {
    ruTests.forEach(function(item) {
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
