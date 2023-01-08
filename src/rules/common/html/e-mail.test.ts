import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/e-mail', [
    ['example@example.com', '<a href="mailto:example@example.com">example@example.com</a>'],
    ['E-mail: example@example.com', 'E-mail: <a href="mailto:example@example.com">example@example.com</a>'],
    ['E-mail: example@example.com, example2@example.com', 'E-mail: <a href="mailto:example@example.com">example@example.com</a>, <a href="mailto:example2@example.com">example2@example.com</a>'],
    ['>example@example.com<', '>example@example.com<']
]]);
