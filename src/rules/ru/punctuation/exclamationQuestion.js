export default {
    name: 'ru/punctuation/exclamationQuestion',
    index: '+5',
    handler(text) {
        const re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');

        return text.replace(re, '$1?!$2');
    }
};
