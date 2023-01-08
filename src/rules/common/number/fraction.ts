import type { TypografRule } from '../../../main';
export const fractionRule: TypografRule = {
    name: 'common/number/fraction',
    handler(text) {
        return text
            .replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
            .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
            .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    },
};
