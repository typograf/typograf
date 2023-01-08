import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/delLeadingBlanks', [
    [
        'Hello world!  \t \n \t \t  Hello world!       \n\n\n\n   \t\t\t   Hello world!\n',
        'Hello world!  \t \nHello world!       \n\n\n\nHello world!\n'
    ],
    [
        '       \t Hello world!  \t \n \t \t  Hello world!\n',
        'Hello world!  \t \nHello world!\n'
    ]
]]);
