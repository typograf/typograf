import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/punctuation/hellip',
    handler(text, settings, context) {
        return context.options.locale[0] === 'ru' ?
            text.replace(/(^|[^.])\.{3,4}(?=[^.]|$)/g, '$1…') :
            text.replace(/(^|[^.])\.{3}(\.?)(?=[^.]|$)/g, '$1…$2');
    }
};

export default rule;
