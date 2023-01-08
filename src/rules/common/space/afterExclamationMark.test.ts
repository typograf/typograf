import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/afterExclamationMark', [
    [
        'Солнце садилось за горизонт,и поднялся ветер!Вот.',
        'Солнце садилось за горизонт,и поднялся ветер! Вот.'
    ],
    [
        '"Я!"',
        '"Я!"'
    ],
    [
        '«Я!»',
        '«Я!»'
    ],
    [
        '‹I!›',
        '‹I!›'
    ]
]]);
