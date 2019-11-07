export default {
    name: 'ru/punctuation/exclamation',
    live: false,
    handler(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/gm, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/gm, '$1!!!$2');
    }
};
