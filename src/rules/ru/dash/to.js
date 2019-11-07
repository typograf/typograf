import { getData } from '../../../data';

export default {
    name: 'ru/dash/to',
    handler(text) {
        const words = [
            'откуда', 'куда', 'где',
            'когда', 'зачем', 'почему',
            'как', 'како[ейм]', 'какая', 'каки[емх]', 'какими', 'какую',
            'что', 'чего', 'че[йм]', 'чьим?',
            'кто', 'кого', 'кому', 'кем'
        ];
        const re = new RegExp('(' + words.join('|') + ')( | -|- )(то|либо|нибудь)' +
                getData('ru/dashAfter'), 'gi');

        return text.replace(re, '$1-$3');
    }
};
