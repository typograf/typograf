import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/insertFinalNewline', [
    [
        'Hello world!',
        'Hello world!\n'
    ],
    [
        'Hello world!\nHello world!\n\n\n',
        'Hello world!\nHello world!\n\n\n'
    ]
]]);
