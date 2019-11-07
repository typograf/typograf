import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/typo/switchingKeyboardLayout', [
    [
        'Cпокойствие', // C - latin letter
        'Спокойствие' // C - russian letter
    ],
    [
        'Ccылка', // Cc - latin letter
        'Ссылка' // Сс - russian letter
    ],
    [
        'Ccылка, ccылка и ещё ccылка',
        'Ссылка, ссылка и ещё ссылка'
    ],
    [
        'Первая ccылка\nВторая ccылка\n...\nCедьмая ccылка',
        'Первая ссылка\nВторая ссылка\n...\nСедьмая ссылка'
    ]
]]);
