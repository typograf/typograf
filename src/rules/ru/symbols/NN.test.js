import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/symbols/NN', [
    ['№№ 5—10', '№ 5—10'],
    ['№№ 5—10\n№№ 8—12', '№ 5—10\n№ 8—12']
]]);
