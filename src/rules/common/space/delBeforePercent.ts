import type { TypografRule } from '../../../main';
export const delBeforePercentRule: TypografRule = {
    name: 'common/space/delBeforePercent',
    handler(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    },
};
