/*jshint maxlen:1000 */
tests.push(['common/nbsp/afterShortWord', [
    ['Apply non-breaking spaces to all frames of the current page.', 'Apply non-breaking spaces to\u00A0all frames of\u00A0the current page.', 'ru'],
    ['Повторять, пока процесс не свернётся в навык.', 'Повторять, пока процесс не\u00A0свернётся в\u00A0навык.', 'ru'],
    ['ТУ 14577-234-224', 'ТУ\u00A014577-234-224', 'ru'],
    ['И вещи', 'И\u00A0вещи', 'ru'],
    ['И в Москве', 'И\u00A0в\u00A0Москве', 'ru'],
    [
        'если целесообразно использовать в издании спец. сокращения (т. е. принятые только в спец. видах литературы и видах издания)',
        'если целесообразно использовать в\u00A0издании спец. сокращения (т. е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания)',
        'ru'
    ],
    [
        'если целесообразно использовать в издании спец. сокращения (<a href="/other/">т. е. принятые только в спец. видах литературы и видах издания</a>)',
        'если целесообразно использовать в\u00A0издании спец. сокращения (<a href="/other/">т. е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания</a>)',
        'ru'
    ],
    [
        'Быль "О солдате"',
        'Быль "О\u00A0солдате"',
        'ru'
    ],
    [
        'Сказка "О царе Салтане"\nБыль "О солдате',
        'Сказка "О\u00A0царе Салтане"\nБыль "О\u00A0солдате',
        'ru'
    ],
    [
        'Whenever I\'m down\n\I call on you my friend\nA helping hand you lend\nIn my time of need\nWhenever I\'m down\nI call on you my friend',
        'Whenever I\'m down\n\I\u00A0call on\u00A0you my\u00A0friend\nA\u00A0helping hand you lend\nIn\u00A0my\u00A0time of\u00A0need\nWhenever I\'m down\nI\u00A0call on\u00A0you my\u00A0friend',
        'en'
    ]
]]);
