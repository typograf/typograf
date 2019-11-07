import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/centuries', [
    ['XX-XXI', 'XX–XXI'],
    ['XX - XXI', 'XX–XXI']
]]);
