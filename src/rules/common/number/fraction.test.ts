import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/number/fraction', [
    ['1/2', '½'],
    [' 1/2 ', ' ½ '],
    ['1/4', '¼'],
    [' 1/4 ', ' ¼ '],
    ['3/4', '¾'],
    [' 3/4 ', ' ¾ ']
]]);
