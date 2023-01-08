import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/punctuation/exclamation', [
    [
        '!!',
        '!'
    ],
    [
        'Ура!!  ',
        'Ура!  '
    ],
    [
        'Ура!!\nУра!!',
        'Ура!\nУра!'
    ],
    [
        '!!!!',
        '!!!'
    ],
    [
        'Ура!!!!  ',
        'Ура!!!  '
    ],
    [
        'Ура!!!!\nУра!!!!',
        'Ура!!!\nУра!!!'
    ]
]]);
