import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/daysMonth', [
    [
        '1-22 сентября',
        '1–22\u00A0сентября'
    ],
    [
        '1-22 сентября/n 53-22 марта',
        '1–22\u00A0сентября/n 53-22 марта'
    ]
]]);
