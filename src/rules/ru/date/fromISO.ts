import type { TypografRule } from '../../../main';
const sp1 = '(-|\\.|\\/)';
const sp2 = '(-|\\/)';
const re1 = new RegExp('(^|\\D)(\\d{4})' + sp1 + '(\\d{2})' + sp1 + '(\\d{2})(\\D|$)', 'gi');
const re2 = new RegExp('(^|\\D)(\\d{2})' + sp2 + '(\\d{2})' + sp2 + '(\\d{4})(\\D|$)', 'gi');

export const fromISORule: TypografRule = {
    name: 'ru/date/fromISO',
    handler(text) {
        return text
            .replace(re1, '$1$6.$4.$2$7')
            .replace(re2, '$1$4.$2.$6$7');
    },
};
