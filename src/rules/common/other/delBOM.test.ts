import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/other/delBOM', [
    [
        '\uFEFFunicorn',
        'unicorn'
    ]
]]);
