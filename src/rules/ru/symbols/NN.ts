import type { TypografRule } from '../../../main';
export const nnRule: TypografRule = {
    name: 'ru/symbols/NN',
    handler(text) {
        return text.replace(/№№/g, '№');
    },
};
