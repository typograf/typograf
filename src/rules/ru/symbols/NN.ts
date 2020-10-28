import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/symbols/NN',
    handler(text) {
        return text.replace(/№№/g, '№');
    }
};

export default rule;
