import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/nbsp/rubleKopek',
    handler(text) {
        return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
    }
};

export default rule;
