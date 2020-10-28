import { Rule } from '../../../types';
import { privateLabel } from '../../../consts';

const rule: Rule = {
    name: 'ru/nbsp/see',
    handler(text) {
        const re = new RegExp(`(^|\\s|${privateLabel}|\\()(см|им)\\.[ \u00A0]?([а-яё0-9a-z]+)([\\s.,?!]|$)`, 'gi');

        return text.replace(re, ($0, $1: string, $2: string, $3: string, $4: string): string => {
            return ($1 === '\u00A0' ? ' ' : $1) + $2 + '.\u00A0' + $3 + $4;
        });
    }
};

export default rule;
