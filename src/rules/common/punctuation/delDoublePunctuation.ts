import type { TypografRule } from '../../../main';
export const delDoublePunctuationRule: TypografRule = {
    name: 'common/punctuation/delDoublePunctuation',
    handler(text) {
        return text
            .replace(/(^|[^,]),,(?!,)/g, '$1,')
            .replace(/(^|[^:])::(?!:)/g, '$1:')
            .replace(/(^|[^!?.])\.\.(?!\.)/g, '$1.')
            .replace(/(^|[^;]);;(?!;)/g, '$1;')
            .replace(/(^|[^?])\?\?(?!\?)/g, '$1?');
    },
};
