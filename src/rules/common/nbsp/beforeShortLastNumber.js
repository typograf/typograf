export default {
    name: 'common/nbsp/beforeShortLastNumber',
    handler(text, settings, context) {
        const ch = context.getData('char');
        const CH = ch.toUpperCase();
        const re = new RegExp('([' + ch + CH +
            ']) (?=\\d{1,' + settings.lengthLastNumber +
            '}[-+−%\'"' + context.getData('quote').right + ')]?([.!?…]( [' +
            CH + ']|$)|$))', 'gm');

        return text.replace(re, '$1\u00A0');
    },
    live: false,
    settings: {
        lengthLastNumber: 2
    }
};
