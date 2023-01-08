import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/trimRight', [
    ['   Hello world!    ', '   Hello world!'],
    [' \n\n \n Hello world!  \n\n  \n  ', ' \n\n \n Hello world!']
]]);
