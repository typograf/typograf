import { typografTest, TypografTest } from '../helpers';

// https://github.com/samdark/Typograph/blob/master/tests/_test.typo-symbols.dat
const ruTests: TypografTest[] = [
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
    ],
    [
        '10 != 20',
        '10 ≠ 20'
    ]
];

typografTest(
    'typograph symbols, double execute',
    ruTests,
    { locale: ['ru', 'en-US'] },
);
