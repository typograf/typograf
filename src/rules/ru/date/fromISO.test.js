import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/date/fromISO', [
    ['2010-02-01', '01.02.2010'],
    [' 2010-02-01 ', ' 01.02.2010 '],
    ['11/22/2010', '22.11.2010'],
    [' 11/22/2010 ', ' 22.11.2010 ']
]]);
