'use strict';

// https://github.com/samdark/Typograph/blob/master/tests/_test.typo-symbols.dat

const helpers = require('./lib/helpers');
const ruTests = [
    [
        '1/2 3/4 1/4',
        '½ ¾ ¼'
    ],
    [
        '(c)Microsoft 2000',
        '©Microsoft 2000'
    ],
    [
        'Microsft(tm)',
        'Microsft™'
    ],
    [
        'Microsoft(r)',
        'Microsoft®'
    ],
    [
        '10*12',
        '10*12'
    ],
    [
        '10X12',
        '10X12'
    ],
    [
        '10x12',
        '10×12'
    ],
    [
        '10х12',
        '10×12'
    ],
    [
        '10Х12',
        '10Х12'
    ],
    [
        '<-',
        '←'
    ],
    [
        '->',
        '→'
    ],
    [
        '-->',
        '-->'
    ],
    [
        '<--',
        '<--'
    ],
    [
        '+-10 метров',
        '±10 метров'
    ],
    [
        '100 %',
        '100%'
    ],
    [
        'слово !!!',
        'слово!!!'
    ],
    [
        'слово !',
        'слово!'
    ],
    [
        'слово !?',
        'слово?!'
    ],
    [
        'слово !!?',
        'слово?!'
    ],
    [
        'слово .',
        'слово.'
    ],
    /*[
        'технология .net',
        'технология .net'
    ],*/
    [
        'слово ?',
        'слово?'
    ],
    [
        'слово :',
        'слово:'
    ],
    [
        '"слово" :',
        '«слово»:'
    ],
    [
        'ааа!!!',
        'ааа!!!'
    ],
    [
        'да???',
        'да???'
    ],
    [
        'ааа!!! ! !! ! !',
        'ааа!!!!!!!!'
    ]
];

helpers.ruTests('typograph symbols', ruTests);
helpers.ruDoubleTests('typograph symbols, double execute', ruTests);
