import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/space/year',
    handler(text, settings, context) {
        const re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
            context.getCharData() + ']|$)', 'g');

        return text.replace(re, '$1$2 $3$5');
    }
};

export default rule;
