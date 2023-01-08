import type { TypografRule } from '../../../main';
export const hellipRule: TypografRule = {
    name: 'common/punctuation/hellip',
    handler(text, _settings, context) {
        return context.prefs.locale[0] === 'ru' ?
            text.replace(/(^|[^.])\.{3,4}(?=[^.]|$)/g, '$1…') :
            text.replace(/(^|[^.])\.{3}(\.?)(?=[^.]|$)/g, '$1…$2');
    },
};
