import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/symbols/arrow', [
    ['20 + 10 -> 30', '20 + 10 → 30'],
    ['20 + 10 <- 30', '20 + 10 ← 30'],
    ['<-', '←'],
    ['->', '→']
]]);
