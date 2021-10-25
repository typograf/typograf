import { privateLabel } from '../../../consts';

export default {
    name: 'ru/punctuation/ano',
    handler(text) {
        const re = new RegExp('([^«„[(!?,:;\\-‒–—\\s' + privateLabel + '])(\\s+)(а|но)(?= |\u00A0|\\n)', 'g');

        return text.replace(re, '$1,$2$3');
    }
};
