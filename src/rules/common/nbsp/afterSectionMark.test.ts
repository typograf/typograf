import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/nbsp/afterSectionMark', [
        [' § 123', ' §\u202F123'],
        [' § 123\n§ 456', ' §\u202F123\n§\u202F456'],
        [' §123', ' §\u202F123'],
        [' §XX', ' §\u202FXX']
    ],
    {locale: 'ru'}
]);

typografRuleTest([
    'common/nbsp/afterSectionMark', [
        [' § 123', ' §\u00A0123'],
        [' § 123\n§ 456', ' §\u00A0123\n§\u00A0456'],
        [' §123', ' §\u00A0123'],
        [' §XX', ' §\u00A0XX'],
        ['§§1-23', '§§\u00A01-23']
    ],
    {locale: 'en-US'}
]);
