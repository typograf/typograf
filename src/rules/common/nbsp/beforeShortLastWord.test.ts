import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/nbsp/beforeShortLastWord', [
        [
            'Fedora, SuSE, Gentoo, Mandrake, or PLD.',
            'Fedora, SuSE, Gentoo, Mandrake, or\u00A0PLD.'
        ],
        [
            'Голубка дряхлая моя!',
            'Голубка дряхлая\u00A0моя!'
        ]
    ],
    {locale: ['ru', 'en-US']}
]);
