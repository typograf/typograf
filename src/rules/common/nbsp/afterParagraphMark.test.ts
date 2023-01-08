import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/nbsp/afterParagraphMark', [
        ['¶ 49', '¶\u00A049']
    ],
    {locale: 'en-US'}
]);
