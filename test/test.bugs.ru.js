var helpers = require('./lib/helpers');
var tests = [
    [
        '<p>"<strong>Hello</strong> World!"</p>',
        '<p>«<strong>Hello</strong> World!»</p>'
    ],
    [
        '<p>"<strong>Hello</strong> World!"</p>\n<p>"<strong>Hello</strong> World!"</p>',
        '<p>«<strong>Hello</strong> World!»</p>\n<p>«<strong>Hello</strong> World!»</p>'
    ]
];

helpers.ruTests('github bugs', tests);
helpers.ruDoubleTests('github bugs, double execute', tests);
