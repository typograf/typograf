import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/nbsp/dpi', [
    ['Значение 10 lpi.', 'Значение 10\u00A0lpi.'],
    ['Значение 10 lpi', 'Значение 10\u00A0lpi'],
    ['Значение 10 lpii', 'Значение 10 lpii'],
    ['Значение 10\u00A0lpi и 20\u00A0dpi.', 'Значение 10\u00A0lpi и 20\u00A0dpi.']
]]);
