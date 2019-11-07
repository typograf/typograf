import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['en-US/dash/main', [
    ['What is serious - and what is not', 'What is serious\u00A0— and what is not'],
    ['What is serious -\nand what is not', 'What is serious\u00A0—\nand what is not'],
    ['What is serious -- and what is not', 'What is serious\u00A0— and what is not']
]]);
