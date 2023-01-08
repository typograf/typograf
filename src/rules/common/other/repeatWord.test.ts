import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/other/repeatWord', [
        ['Я пошел домой.', 'Я пошел домой.'],
        ['Я поехал в в Лондон.', 'Я поехал в в Лондон.'],
        ['Я пошел пошел домой.', 'Я пошел домой.'],
        ['Я пошел пошел пошел домой домой.', 'Я пошел пошел домой.'],
        ['Я пошел пошел пошел домой домой.', 'Я пошел пошел домой.'],
        ['Это то, без чего мне не жить.', 'Это то, без чего мне не жить.'],
        ['"то то"', '"то"']
    ],
    {locale: 'ru'}
]);

typografRuleTest([
    'common/other/repeatWord', [
        ['Hello world world!', 'Hello world!'],
        ['world world', 'world']
    ],
    {locale: 'en-US'}
]);

