import { typografInnerRuleTest, typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/optalign/bracket', [
    ['В самом добром (кино)', 'В самом добром<span class="typograf-oa-sp-lbracket"> </span><span class="typograf-oa-lbracket">(</span>кино)'],
    ['В самом добром\n(кино)', 'В самом добром\n<span class="typograf-oa-n-lbracket">(</span>кино)']
]]);

typografInnerRuleTest(['ru/optalign/bracket', [
    ['<span class="typograf-oa-sp-lbracket"> </span>', ' '],
    ['<span class="typograf-oa-n-lbracket"> </span>', ' '],
    ['<span class="typograf-oa-n-lbracket"> </span>\n<span class="typograf-oa-n-lbracket"> </span>', ' \n '],
    ['<span class="typograf-oa-lbracket">(</span>', '(']
]]);
