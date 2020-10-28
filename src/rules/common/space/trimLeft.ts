import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/trimLeft',
    index: '-4',
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/TrimLeft
    handler: typeof String.prototype.trimLeft === 'function' ?
        text => text.trimLeft() :
        /* istanbul ignore next */
        text => text.replace(/^[\s\uFEFF\xA0]+/g, '')
};

export default rule;
