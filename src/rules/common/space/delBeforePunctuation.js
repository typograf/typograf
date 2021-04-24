export default {
    name: 'common/space/delBeforePunctuation',
    handler(text) {
        return text.replace(/(^|[^!?:;,.…]) ([!?:;,])(?!\))/g, '$1$2');
    }
};
