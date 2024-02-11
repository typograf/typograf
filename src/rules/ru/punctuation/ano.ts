import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

export const anoRule: TypografRule = {
    name: 'ru/punctuation/ano',
    handler(text) {
        const parts: string[] = [
            '([^«„[(!?,:;\\-‒–—\\s' + privateLabel + '])', // Запятую не ставим, если уже есть какой-либо знак
            '(?<!([^а-яА-Я]+ну|Ну))', // Запятую не ставим перед ну
            '(\\s+)', // Отступ между левой и правой частями в виде пробельных символов
            '(а|но)', // Союзы
            '(?= |\u00A0|\\n)' // Остальная часть предложения(пробел, неразрывной пробел, перевод строки)
        ]
        const re = new RegExp(parts.join(''), 'g');

        return text.replace(re, '$1,$3$4');
    },
};
