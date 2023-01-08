import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/nbsp/year', [
    ['2012 г.', '2012\u00A0г.'],
    [' (2012 г.) ', ' (2012\u00A0г.) ']
]]);
