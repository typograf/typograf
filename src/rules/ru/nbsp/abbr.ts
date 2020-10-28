import { Rule } from '../../../types';
import { privateLabel } from '../../../consts';

function abbr($0: string, $1: string, $2: string, $3: string) {
    // дд.мм.гггг
    if ($2 === 'дд' && $3 === 'мм') {
        return $0;
    }

    // Являются ли сокращения ссылкой
    if (['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf($3) > -1) {
        return $0;
    }

    return $1 + $2 + '.' + '\u00A0' + $3 + '.';
}

const rule: Rule = {
    name: 'ru/nbsp/abbr',
    handler(text) {
        const re = new RegExp(`(^|\\s|${privateLabel})([а-яё]{1,3})\\. ?([а-яё]{1,3})\\.`, 'g');

        return text
            .replace(re, abbr)
            // Для тройных сокращений - а.е.м.
            .replace(re, abbr);
    }
};

export default rule;
