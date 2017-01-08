tests.push([
    'common/nbsp/afterNumber', [
        [
            ' 123 дня ',
            ' 123\u00A0дня '
        ],
        [
            '2 кошки',
            '2\u00A0кошки'
        ],
        [
            '12 миллиардов рублей',
            '12\u00A0миллиардов рублей'
        ],
        [
            '20 years',
            '20\u00A0years'
        ]
    ],
    {locale: ['ru', 'en-US']}
]);
