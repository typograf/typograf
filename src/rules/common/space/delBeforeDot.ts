import type { TypografRule } from '../../../main';
export const delBeforeDotRule: TypografRule = {
    name: 'common/space/delBeforeDot',
    handler(text) {
        return text.replace(/(^|[^!?:;,.…]) (\.|\.\.\.)(\s|$)/g, '$1$2$3');
    },
};
