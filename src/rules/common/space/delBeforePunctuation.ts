import type { TypografRule } from '../../../main';
export const delBeforePunctuationRule: TypografRule = {
    name: 'common/space/delBeforePunctuation',
    handler(text) {
        return text.replace(/(^|[^!?:;,.…]) ([!?:;,])(?!\))/g, '$1$2');
    },
};
