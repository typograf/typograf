import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/hellip', [
        [
            'The ... fox jumped ...',
            'The … fox jumped …'
        ],
        [
            'The quick brown fox jumped over the lazy dog. ... And if they have not died, they are still alive today.',
            'The quick brown fox jumped over the lazy dog. … And if they have not died, they are still alive today.',
        ],
        [
            'The...fox jumped...\
            The quick brown fox jumped over the lazy dog...And if they have not died, they are still alive today.\
            It is not cold... it is freezing cold.',
            'The…fox jumped…\
            The quick brown fox jumped over the lazy dog…And if they have not died, they are still alive today.\
            It is not cold… it is freezing cold.'
        ],
        [
            '..',
            '..'
        ],
        [
            '...',
            '…'
        ],
        [
            '...\n...',
            '…\n…'
        ],
        [
            '.....',
            '.....'
        ],
        [
            'i ... j',
            'i … j'
        ],
        [
            'k....',
            'k….'
        ],
        [
            'l..., l',
            'l…, l'
        ],
        [
            'l, ... l',
            'l, … l'
        ],
        [
            'm...?',
            'm…?'
        ],
        [
            'n...!',
            'n…!'
        ],
        [
            '[...]\n(...)',
            '[…]\n(…)'
        ],
        [
            '[. . .]\n(. . .)',
            '[. . .]\n(. . .)'
        ]
    ],
    {locale: 'en-GB'}
]);
