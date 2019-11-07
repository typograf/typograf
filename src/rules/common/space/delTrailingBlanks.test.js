import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/delTrailingBlanks', [
    ['Hello world!  \t \n Hello world!       \n\n\n\nHello world!\n',
        'Hello world!\n Hello world!\n\n\n\nHello world!\n']
]]);
