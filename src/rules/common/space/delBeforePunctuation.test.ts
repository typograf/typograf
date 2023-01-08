import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/delBeforePunctuation', [
    [
        'В неполном предложении отсутствует один или несколько членов , значение которых понятно из контекста или из ситуации.',
        'В неполном предложении отсутствует один или несколько членов, значение которых понятно из контекста или из ситуации.'
    ],
    [
        'Армия пролетариев, встань стройна !',
        'Армия пролетариев, встань стройна!'
    ],
    [
        'Печально я гляжу на наше поколенье !\nПечально я гляжу на наше поколенье !',
        'Печально я гляжу на наше поколенье!\nПечально я гляжу на наше поколенье!'
    ],
    [
        'Fantastic, we closed the deal !',
        'Fantastic, we closed the deal!'
    ],
    [
        'Were the visitors shown the new pictures ?',
        'Were the visitors shown the new pictures?'
    ]
]]);
