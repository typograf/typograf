import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/delBeforePercent', [
    ['20 %', '20%'],
    ['около 4\u00A0%', 'около 4%']
]]);
