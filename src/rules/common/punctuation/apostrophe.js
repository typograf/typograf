export default {
    name: 'common/punctuation/apostrophe',
    handler(text, settings, context) {
        const letters = '([' + context.getData('char') + '])';
        const re = new RegExp(letters + '\'' + letters, 'gi');

        return text.replace(re, '$1’$2');
    }
};
