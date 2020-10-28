import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/nbsp/afterSectionMark',
    handler(text, settings, context) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        const locale = context.options.locale[0];
        return text.replace(/§[ \u00A0\u2009]?(?=\d|I|V|X)/g, locale === 'ru' ? '§\u202F' : '§\u00A0');
    }
};

export default rule;
