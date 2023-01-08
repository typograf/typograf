import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/kakto', [
    ['Как то', 'Как-то'],
    ['как то.', 'как-то.'],
    ['Баскак то', 'Баскак то'],
    ['123как то', '123как то'],
    ['abcdefкак то', 'abcdefкак то'],
]]);
