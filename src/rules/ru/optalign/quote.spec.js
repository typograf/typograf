tests.push(['ru/optalign/quote', [
    ['Вот у вас «Мой спутник».', 'Вот у вас<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">«</span>Мой спутник».'],
    ['Вот у вас\n«Мой спутник».', 'Вот у вас\n<span class="typograf-oa-n-lquote">«</span>Мой спутник».'],
    ['Вот у вас \uDBFF«Мой спутник».\uDBFF', 'Вот у вас \uDBFF<span class="typograf-oa-n-lquote">«</span>Мой спутник».\uDBFF'],
    ['"что-то", "где-то!"', '<span class="typograf-oa-n-lquote">"</span>что-то",<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">"</span>где-то!"'],
    ['"что-то, где-то" и "почему-то."', '<span class="typograf-oa-n-lquote">"</span>что-то, где-то" и<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">"</span>почему-то."'],
    ['тестовый эфир 1 «постно — значит вкусно»', 'тестовый эфир 1<span class="typograf-oa-sp-lquote"> </span><span class="typograf-oa-lquote">«</span>постно — значит вкусно»']
]]);

innerTests.push(['ru/optalign/quote', [
    ['<span class="typograf-oa-sp-lquote"> </span>', ' '],
    ['<span class="typograf-oa-lquote">«</span>', '«'],
    ['\n<span class="typograf-oa-n-lquote">«</span>', '\n«']
]]);
