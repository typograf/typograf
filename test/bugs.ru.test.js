import { typografTest } from './helpers';

const tests = [
    [
        '<p>"<strong>Hello</strong> World!"</p>',
        '<p>«<strong>Hello</strong> World!»</p>'
    ],
    [
        '<p>"<strong>Hello</strong> World!"</p>\n<p>"<strong>Hello</strong> World!"</p>',
        '<p>«<strong>Hello</strong> World!»</p>\n<p>«<strong>Hello</strong> World!»</p>'
    ],
    [
        'Bob’s',
        'Bob’s'
    ]
];

typografTest('github bugs, double execute', tests, { locale: ['ru', 'en-US'] });
