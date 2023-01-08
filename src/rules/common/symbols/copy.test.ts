import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/symbols/copy', [
    ['(c)', '©'],
    ['(с)', '©'],
    ['Copyright (с)', '©'],
    ['copyright (с)', '©'],
    ['(r)', '®'],
    ['(tm)', '™']
]]);
