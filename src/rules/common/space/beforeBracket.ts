import { DataChar } from '../../../data';
import type { TypografRule } from '../../../main';
export const beforeBracketRule: TypografRule = {
    name: 'common/space/beforeBracket',
    handler(text, _settings, context) {
        const char = context.getData('char') as DataChar;
        const re = new RegExp('([' + char + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    },
};
