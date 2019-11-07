import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/nbr', [
    ['a\nb\nc', 'a<br/>\nb<br/>\nc'],
    ['a<br/>\nb\nc', 'a<br/>\nb<br/>\nc'],
    ['a\n\nb\nc', 'a\n\nb<br/>\nc'],
    ['\na\n\nb\nc\n\nd\ne\n', '\na\n\nb<br/>\nc\n\nd<br/>\ne\n']
]]);
