/*jshint maxlen:1000 */
tests.push(['ru/optalign/quot', [
    ['Вот у вас «Мой спутник».', 'Вот у вас<span class="typograf-oa-sp-lquot"> </span><span class="typograf-oa-lquot">«</span>Мой спутник».'],
    ['Вот у вас\n«Мой спутник».', 'Вот у вас\n<span class="typograf-oa-n-lquot">«</span>Мой спутник».'],
    ['Вот у вас<p> «Мой спутник».</p>', 'Вот у вас<p> <span class="typograf-oa-n-lquot">«</span>Мой спутник».</p>']
]]);

tests.push(['-ru/optalign/quot', [
    ['<span class="typograf-oa-sp-lquot"> </span>', ' '],
    ['<span class="typograf-oa-lquot">«</span>', '«'],
    ['\n<span class="typograf-oa-n-lquot">«</span>', '\n«']
]]);
