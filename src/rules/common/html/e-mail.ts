import type { TypografRule } from '../../../main';
export const eMailRule: TypografRule = {
    name: 'common/html/e-mail',
    queue: 'end',
    handler(text, _settings, context) {
        return context.isHTML ? text : text.replace(
            /(^|[\s;(])([\w\-.]{2,64})@([\w\-.]{2,64})\.([a-z]{2,64})([)\s.,!?]|$)/gi,
            '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5'
        );
    },
    disabled: true,
    htmlAttrs: false,
};
