import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/trimLeft', [
    ['   Hello world!    ', 'Hello world!    '],
    [' \n\n \n Hello world!  \n\n  \n  ', 'Hello world!  \n\n  \n  ']
]]);
