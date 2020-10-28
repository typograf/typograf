import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/html/e-mail',
    queue: 'end',
    handler(text, settings, context) {
        return context.isHTML ? text : text.replace(
            /(^|[\s;(])([\w\-.]{2,64})@([\w\-.]{2,64})\.([a-z]{2,64})([)\s.,!?]|$)/gi,
            '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5'
        );
    },
    disabled: true,
    htmlAttrs: false
};

export default rule;
