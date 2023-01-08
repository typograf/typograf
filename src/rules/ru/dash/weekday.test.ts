import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/dash/weekday', [
    ['Вторник-среда', 'Вторник–среда'],
    ['понедельник-четверг', 'понедельник–четверг']
]]);
