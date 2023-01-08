import type { TypografRule } from '../../../main';
export const mlnRule: TypografRule = {
    name: 'ru/nbsp/mln',
    handler(text) {
        return text.replace(/(\d) ?(тыс|млн|млрд|трлн)(\.|\s|$)/gi, '$1\u00a0$2$3');
    },
};
