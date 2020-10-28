import { Rule } from '../../../types';
import Typograf from '../../../typograf';
import { privateLabel } from '../../../consts';

const rule: Rule = {
    name: 'ru/nbsp/initials',
    handler(text) {
        const spaces = '\u00A0\u202F '; // nbsp, thinsp
        const quote = Typograf.getData<{ left: string; right: string }>('ru/quote');
        const re = new RegExp('(^|[' + spaces +
                quote.left +
                privateLabel +
                '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                ']?([А-ЯЁ][а-яё]+)(?=[\\s.,;:?!"' + quote.right + ']|$)', 'gm');

        return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
    }
};

export default rule;
