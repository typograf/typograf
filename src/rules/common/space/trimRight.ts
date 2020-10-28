import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/trimRight',
    index: '-3',
    live: false,
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/TrimLeft
    handler: typeof String.prototype.trimRight === 'function' ?
        (text: string) => text.trimRight() :
        /* istanbul ignore next */
        (text: string) => text.replace(/[\s\uFEFF\xA0]+$/g, '')
};

export default rule;
