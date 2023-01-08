import { DataChar } from '../../../data';
import type { TypografRule } from '../../../main';
export const afterNumberRule: TypografRule = {
    name: 'common/nbsp/afterNumber',
    handler(text, _settings, context) {
        const char = context.getData('char') as DataChar;
        const re = '(^|\\s)(\\d{1,5}) ([' + char + ']+)';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    },
    disabled: true,
};
