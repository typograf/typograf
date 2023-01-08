import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/decade', [
    [
        '80-90-е годы',
        '80–90-е годы'
    ],
    [
        'В 1980-90-е годы',
        'В 1980–90-е годы'
    ],
    [
        '1980-2010-е гг.',
        '1980–2010-е гг.'
    ]
]]);
