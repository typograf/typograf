import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/nbsp/afterShortWordByList', [
        [
            'Повторять, пока процесс не свернётся в навык.',
            'Повторять, пока процесс не\u00A0свернётся в\u00A0навык.'
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
            'если\u00a0целесообразно использовать в\u00A0издании спец. сокращения (т. е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания)'
        ],
        [
            'если целесообразно использовать в издании спец. сокращения (<a href="/other/">т. е. принятые только в спец. видах литературы и видах издания</a>)',
            'если\u00a0целесообразно использовать в\u00A0издании спец. сокращения (<a href="/other/">т. е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания</a>)'
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
    'common/nbsp/afterShortWordByList', [
        [
            'Apply non-breaking spaces to all frames of the current page.',
            'Apply non-breaking spaces to\u00A0all frames of\u00A0the\u00A0current page.'
        ],
        [
            'Whenever I\'m down\nI call on you my friend\nA helping hand you lend\nIn my time of need\nWhenever I\'m down\nI call on you my friend',
            'Whenever I\'m down\nI call on\u00A0you my friend\nA\u00A0helping hand you lend\nIn\u00A0my time of\u00A0need\nWhenever I\'m down\nI call on\u00A0you my friend',
        ]
    ],
    {locale: 'en-US'}
]);

typografRuleTest([
    'common/nbsp/afterShortWordByList', [
        [
            'Vado a Roma domani.',
            'Vado a\u00a0Roma domani.'
        ],
        [
            'Questa è una lettera da Marco',
            'Questa è\u00a0una lettera da\u00a0Marco',
        ],
        [
            'Il ragazzo e la ragazza sono amici.',
            'Il\u00a0ragazzo e\u00a0la\u00a0ragazza sono amici.',
        ]
    ],
    {locale: 'it'},
]);

typografRuleTest([
    'common/nbsp/afterShortWordByList', [
        [
            'Ich fahre mit dem Zug über Hamburg nach Berlin.',
            'Ich fahre mit\u00A0dem\u00A0Zug über\u00A0Hamburg nach\u00A0Berlin.'
        ],
        [
            'Das ist ein Test für die deutsche Sprache.',
            'Das\u00A0ist ein\u00A0Test für\u00A0die\u00A0deutsche Sprache.'
        ],
        [
            'Er fährt heute schnell.',
            'Er fährt heute schnell.'
        ]
    ],
    {locale: 'de'},
]);

typografRuleTest([
    'common/nbsp/afterShortWordByList', [
        [
            'Le pain et le fromage sont sur la table.',
            'Le\u00A0pain et\u00A0le\u00A0fromage sont sur\u00A0la\u00A0table.'
        ],
        [
            'Je vais au marché avec ma sœur.',
            'Je vais au\u00A0marché avec\u00A0ma sœur.'
        ],
        [
            'Elle arrive demain.',
            'Elle arrive demain.'
        ]
    ],
    {locale: 'fr'},
]);
