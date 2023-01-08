import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/delRepeatSpace', [
    ['  \n  \n  Hello   world  !  \n  \n  ', '  \n  \n  Hello world !  \n  \n  ']
]]);
