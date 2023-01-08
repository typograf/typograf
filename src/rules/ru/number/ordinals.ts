import { DataChar } from '../../../data';
import type { TypografRule } from '../../../main';
export const ordinalsRule: TypografRule = {
    name: 'ru/number/ordinals',
    handler(text, _settings, context) {
        const char = context.getData('char') as DataChar;
        const re = new RegExp('(\\d[%‰]?)-(ый|ой|ая|ое|ые|ым|ом|ых|ого|ому|ыми)(?![' + char + '])', 'g');

        return text.replace(re, ($0, $1, $2) => {
            const parts: Record<string, string> = {
                'ой': 'й',
                'ый': 'й',
                'ая': 'я',
                'ое': 'е',
                'ые': 'е',
                'ым': 'м',
                'ом': 'м',
                'ых': 'х',
                'ого': 'го',
                'ому': 'му',
                'ыми': 'ми',
            };

            return $1 + '-' + parts[$2];
        });
    },
};
