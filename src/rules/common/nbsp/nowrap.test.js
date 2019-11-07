import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/nbsp/nowrap', [
    ['<nowrap>Hello\u00A0world!</nowrap>', '<nowrap>Hello world!</nowrap>'],
    ['<nobr>\u00A0\u00A0\u00A0Hello\u00A0world!\u00A0\u00A0</nobr>', '<nobr>\u00A0\u00A0\u00A0Hello world!\u00A0\u00A0</nobr>'],
    ['<nobr>Hello\u00A0\u00A0world!</nobr>', '<nobr>Hello\u00A0\u00A0world!</nobr>'],
    ['В глуши долин, <nowrap>в\u00A0печальной\u00A0тьме</nowrap> лесов,', 'В глуши долин, <nowrap>в печальной тьме</nowrap> лесов,'],
    ['В глуши долин, <nobr>в\u00A0печальной\u00A0тьме</nobr> лесов,', 'В глуши долин, <nobr>в печальной тьме</nobr> лесов,']
]]);
