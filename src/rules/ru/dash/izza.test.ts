import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/izza', [
    ['Из за лесу', 'Из-за лесу'],
    ['  Из за лесу', '  Из-за лесу'],
    ['из за гор', 'из-за гор'],
    ['  из за гор', '  из-за гор']
]]);
