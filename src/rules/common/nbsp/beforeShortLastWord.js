export default {
    name: 'common/nbsp/beforeShortLastWord',
    handler(text, settings, context) {
        const ch = context.getData('char');
        const CH = ch.toUpperCase();
        const re = new RegExp('([' + ch + '\\d]) ([' +
                ch + CH + ']{1,' + settings.lengthLastWord +
                '}[.!?…])( [' + CH + ']|$)', 'g');

        return text.replace(re, '$1\u00A0$2$3');
    },
    settings: {
        lengthLastWord: 3
    }
};
