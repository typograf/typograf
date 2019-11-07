import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/nbsp/afterShortWord', [
        [
            'Повторять, пока процесс не свернётся в навык.',
            'Повторять, пока процесс не\u00A0свернётся в\u00A0навык.'
        ],
        [
            'ТУ 14577-234-224',
            'ТУ\u00A014577-234-224'
        ],
        [
            'И вещи',
            'И\u00A0вещи'
        ],
        [
            'И в Москве',
            'И\u00A0в\u00A0Москве'
        ],
        [
            'если целесообразно использовать в издании спец. сокращения (т. е. принятые только в спец. видах литературы и видах издания)',
            'если целесообразно использовать в\u00A0издании спец. сокращения (т. е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания)'
        ],
        [
            'если целесообразно использовать в издании спец. сокращения (<a href="/other/">т. е. принятые только в спец. видах литературы и видах издания</a>)',
            'если целесообразно использовать в\u00A0издании спец. сокращения (<a href="/other/">т. е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания</a>)'
        ],
        [
            'Быль "О солдате"',
            'Быль "О\u00A0солдате"'
        ],
        [
            'Сказка "О царе Салтане"\nБыль "О солдате',
            'Сказка "О\u00A0царе Салтане"\nБыль "О\u00A0солдате'
        ]
    ],
    {locale: 'ru'}
]);

typografRuleTest([
    'common/nbsp/afterShortWord', [
        [
            'Apply non-breaking spaces to all frames of the current page.',
            'Apply non-breaking spaces to\u00A0all frames of\u00A0the current page.'
        ],
        [
            'Whenever I\'m down\nI call on you my friend\nA helping hand you lend\nIn my time of need\nWhenever I\'m down\nI call on you my friend',
            'Whenever I\'m down\nI\u00A0call on\u00A0you my\u00A0friend\nA\u00A0helping hand you lend\nIn\u00A0my\u00A0time of\u00A0need\nWhenever I\'m down\nI\u00A0call on\u00A0you my\u00A0friend',
        ]
    ],
    {locale: 'en-US'}
]);
