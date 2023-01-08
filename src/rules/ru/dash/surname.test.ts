import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/surname', [
    ['Николай -он', 'Николай\u00A0—он'],
    ['Николай -2', 'Николай -2'],
    ['(Николай -он; Н. Даниельсон)', '(Николай\u00A0—он; Н. Даниельсон)']
]]);
