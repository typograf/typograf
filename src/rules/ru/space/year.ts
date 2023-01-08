import { DataChar } from '../../../data';
import type { TypografRule } from '../../../main';
export const yearRule: TypografRule = {
    name: 'ru/space/year',
    handler(text, _settings, context) {
        const char = context.getData('char') as DataChar;
        const re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
            char + ']|$)', 'g');

        return text.replace(re, '$1$2 $3$5');
    }
};
