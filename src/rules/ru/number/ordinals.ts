import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/number/ordinals',
    handler(text, settings, context) {
        const re = new RegExp('(\\d[%‰]?)-(ый|ой|ая|ое|ые|ым|ом|ых|ого|ому|ыми)(?![' + context.getCharData() + '])', 'g');

        return text.replace(re, ($0, $1: string, $2: string) => {
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
    }
};

export default rule;
