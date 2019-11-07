import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/nbsp/dayMonth', [
    ['20 декабря', '20\u00A0декабря'],
    ['20 дек 2010', '20\u00A0дек 2010'],
    ['1 мая 2015', '1\u00A0мая 2015']
]]);
