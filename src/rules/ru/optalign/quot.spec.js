/*jshint maxlen:1000 */
tests.push(['ru/optalign/quot', [
    ['Вот у вас «Мой спутник».', 'Вот у вас<span class="typograf-oa-sp-lquot"> </span><span class="typograf-oa-lquot">«</span>Мой спутник».'],
    ['Вот у вас\n«Мой спутник».', 'Вот у вас\n<span class="typograf-oa-n-lquot">«</span>Мой спутник».'],
    ['Вот у вас \uDBFF«Мой спутник».\uDBFF', 'Вот у вас \uDBFF<span class="typograf-oa-n-lquot">«</span>Мой спутник».\uDBFF'],
    ['"что-то", "где-то!"', '<span class="typograf-oa-n-lquot">"</span>что-то",<span class="typograf-oa-sp-lquot"> </span><span class="typograf-oa-lquot">"</span>где-то!"'],
    ['"что-то, где-то" и "почему-то."', '<span class="typograf-oa-n-lquot">"</span>что-то, где-то" и<span class="typograf-oa-sp-lquot"> </span><span class="typograf-oa-lquot">"</span>почему-то."'],
    ['тестовый эфир 1 «постно — значит вкусно»', 'тестовый эфир 1<span class="typograf-oa-sp-lquot"> </span><span class="typograf-oa-lquot">«</span>постно — значит вкусно»']
]]);

innerTests.push(['ru/optalign/quot', [
    ['<span class="typograf-oa-sp-lquot"> </span>', ' '],
    ['<span class="typograf-oa-lquot">«</span>', '«'],
    ['\n<span class="typograf-oa-n-lquot">«</span>', '\n«']
]]);
