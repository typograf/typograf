import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const toRule: TypografRule = {
    name: 'ru/dash/to',
    handler(text) {
        const words = '[Оо]ткуда|[Кк]уда|[Гг]де|[Кк]огда|[Зз]ачем|[Пп]очему|[Кк]ак|[Кк]ако[ейм]|[Кк]акая|[Кк]аки[емх]|[Кк]акими|[Кк]акую|[Чч]то|[Чч]его|[Чч]е[йм]|[Чч]ьим?|[Кк]то|[Кк]ого|[Кк]ому|[Кк]ем';
        const re = new RegExp('(^|[^А-ЯЁа-яё\\w])(' + words + ')( | -|- )(то|либо|нибудь)' +
                getData('ru/dashAfter'), 'g');

        return text.replace(re, function($0, $1, $2, $3, $4) {
            const kakto = $2 + $3 + $4;
            // Отдельно обрабатываем в ru/dash/kakto
            if (kakto === 'как то' || kakto === 'Как то') {
                return $0;
            }

            return $1 + $2 + '-' + $4;
        });
    },
};
