import { DataChar } from '../../../data';
import type { TypografRule } from '../../../main';
export const apostropheRule: TypografRule = {
    name: 'common/punctuation/apostrophe',
    handler(text, _settings, context) {
        const char = context.getData('char') as DataChar;
        const letters = '([' + char + '])';
        const re = new RegExp(letters + '\'' + letters, 'gi');

        return text.replace(re, '$1’$2');
    },
};
