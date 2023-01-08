import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/nbsp/ps', [
    [
        'p.s.: текст',
        'P.\u00A0S. текст'
    ],
    [
        '\np.p.s.: текст',
        '\nP.\u00A0P.\u00A0S. текст'
    ],
    [
        ' P.s.: текст',
        ' P.\u00A0S. текст'
    ],
    [
        ' з.ы.: текст',
        ' P.\u00A0S. текст'
    ],
    [
        ' Ps. текст',
        ' Ps. текст'
    ],
    [
        '2P.S. текст',
        '2P.S. текст'
    ]
]]);
