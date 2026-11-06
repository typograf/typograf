import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

export const anoRule: TypografRule = {
    name: 'ru/punctuation/ano',
    handler(text) {
        const nuA = '(?:^|[^А-ЯЁа-яё\\w])[Нн][Уу]\\s+а';
        const conjunction = `([^«„[(!?,:;\\-‒–—\\s${privateLabel}])(\\s+(?:а|но))`;
        const re = new RegExp(`(?:${nuA}|${conjunction})(?= |\u00A0|\\n)`, 'g');

        return text.replace(re, (match, before: string, after: string) => before ? `${before},${after}` : match);
    },
};
