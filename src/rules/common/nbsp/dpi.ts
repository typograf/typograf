import type { TypografRule } from '../../../main';
export const dpiRule: TypografRule = {
    name: 'common/nbsp/dpi',
    handler(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    },
};
