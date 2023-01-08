import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/nbsp/afterNumberSign', [
    [' № 123', ' №\u202F123'],
    ['№ 123', '№\u202F123'],
    [' №123', ' №\u202F123'],
    [' №п/п ', ' №\u202Fп/п ']
]]);
