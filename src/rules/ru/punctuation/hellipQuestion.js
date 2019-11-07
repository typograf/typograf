export default {
    name: 'ru/punctuation/hellipQuestion',
    handler(text) {
        return text
            .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
            .replace(/(!|\?)(\.\.\.|…)(?=[^.]|$)/g, '$1..');
    }
};
