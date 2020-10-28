import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/punctuation/ano',
    handler(text) {
        const re = new RegExp('([^«„[(!?,:;\\-‒–—\\s])(\\s+)(а|но)(?= |\u00A0|\\n)', 'g');

        return text.replace(re, '$1,$2$3');
    },
    // Запятая может идти после ссылки.
    queue: 'hide-safe-tags-html'
};

export default rule;
