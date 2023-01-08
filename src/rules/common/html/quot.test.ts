import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/quot', [
    [
        '&quot;Огонь затухает, и повелители пепла покидают свои троны&quot;',
        '"Огонь затухает, и повелители пепла покидают свои троны"',
    ]
]]);
