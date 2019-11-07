import { typografInnerRuleTest, typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/optalign/quote', [
    [
        'Вот у вас «Мой спутник».',
        'Вот у вас<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">«</span>Мой спутник».'
    ],
    [
        'Вот у вас\n«Мой спутник».',
        'Вот у вас<span class="typograf-oa-sp-lquote">\n</span><span class="typograf-oa-lquote">«</span>Мой спутник».'
    ],
    [
        '«Billboard Hot 100»\n\n«Второе британское вторжение»',
        '<span class="typograf-oa-n-lquote">«</span>Billboard Hot 100»\n\n<span class="typograf-oa-n-lquote">«</span>Второе британское вторжение»'
    ],
    [
        '«Billboard Hot 100»\n«Второе британское вторжение»\n\n«Billboard Hot 100»\n«Второе британское вторжение»',
        '<span class="typograf-oa-n-lquote">«</span>Billboard Hot 100»<span class="typograf-oa-sp-lquote">\n</span><span class="typograf-oa-lquote">«</span>Второе британское вторжение»\n\n' +
            '<span class="typograf-oa-n-lquote">«</span>Billboard Hot 100»<span class="typograf-oa-sp-lquote">\n</span><span class="typograf-oa-lquote">«</span>Второе британское вторжение»'
    ],
    [
        'Вот у вас\n«Мой спутник».\nВот у вас\n«Мой спутник».',
        'Вот у вас<span class="typograf-oa-sp-lquote">\n</span><span class="typograf-oa-lquote">«</span>Мой спутник».\nВот у вас<span class="typograf-oa-sp-lquote">\n</span><span class="typograf-oa-lquote">«</span>Мой спутник».'
    ],
    [
        'Вот у вас \uF000«Мой спутник».\uF000',
        'Вот у вас \uF000<span class="typograf-oa-n-lquote">«</span>Мой спутник».\uF000'
    ],
    [
        '«что-то», «где-то!»',
        '<span class="typograf-oa-n-lquote">«</span>что-то»,<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">«</span>где-то!»'
    ],
    [
        '«что-то, где-то» и «почему-то.»',
        '<span class="typograf-oa-n-lquote">«</span>что-то, где-то» и<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">«</span>почему-то.»'
    ],
    [
        'тестовый эфир 1 «постно — значит вкусно»',
        'тестовый эфир 1<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">«</span>постно — значит вкусно»'
    ],
    [
        'хранил\n«флаг',
        'хранил<span class="typograf-oa-sp-lquote">\n</span><span class="typograf-oa-lquote">«</span>флаг',
    ]
]]);

typografInnerRuleTest(['ru/optalign/quote', [
    ['<span class="typograf-oa-sp-lquote">\n</span>', '\n'],
    ['<span class="typograf-oa-sp-lquote"> </span>', ' '],
    ['<span class="typograf-oa-lquote">«</span>', '«'],
    ['\n<span class="typograf-oa-n-lquote">«</span>', '\n«'],
    ['\n<span class="typograf-oa-n-lquote">«</span>', '\n«']
]]);
