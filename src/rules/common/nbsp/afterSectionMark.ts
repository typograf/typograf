import type { TypografRule } from '../../../main';
export const afterSectionMarkRule: TypografRule = {
    name: 'common/nbsp/afterSectionMark',
    handler(text, _settings, context) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        const locale = context.prefs.locale[0];

        return text.replace(/§[ \u00A0\u2009]?(?=\d|I|V|X)/g, locale === 'ru' ? '§\u202F' : '§\u00A0');
    },
};
