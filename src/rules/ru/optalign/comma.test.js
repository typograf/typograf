import { typografInnerRuleTest, typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/optalign/comma', [
    ['Смеркалось, шёл дождь', 'Смеркалось<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>шёл дождь'],
    ['Было 2, стало 5', 'Было 2<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>стало 5']
]]);

typografInnerRuleTest(['ru/optalign/comma', [
    ['<span class="typograf-oa-comma">,</span>', ','],
    ['<span class="typograf-oa-comma-sp"> </span>', ' ']
]]);
