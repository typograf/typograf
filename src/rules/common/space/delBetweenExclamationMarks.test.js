import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/delBetweenExclamationMarks', [
    [
        'Печально я гляжу на наше поколенье! ! !',
        'Печально я гляжу на наше поколенье!!!'
    ],
    [
        'Что нам стоит дом построить? !',
        'Что нам стоит дом построить?!'
    ],
    [
        'Fantastic, we closed the deal! ! !\nFantastic, we closed the deal! ! !',
        'Fantastic, we closed the deal!!!\nFantastic, we closed the deal!!!'
    ],
]]);
