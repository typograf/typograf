import type { TypografRule } from '../../../main';
import { DataQuote, getData } from '../../../data';
import { privateLabel } from '../../../consts';

export const initialsRule: TypografRule = {
    name: 'ru/nbsp/initials',
    handler(text) {
        const spaces = '\u00A0\u202F '; // nbsp, thinsp
        const quote = getData('ru/quote') as DataQuote;
        const re = new RegExp('(^|[(' + spaces +
                quote.left +
                privateLabel +
                '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                ']?([А-ЯЁ][а-яё]+)', 'gm');

        return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
    },
};
