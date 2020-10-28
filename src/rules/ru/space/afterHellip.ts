import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/space/afterHellip',
    handler(text) {
        return text
            .replace(/([а-яё])(\.\.\.|…)([А-ЯЁ])/g, '$1$2 $3')
            .replace(/([?!]\.\.)([а-яёa-z])/gi, '$1 $2');
    }
};

export default rule;

