export default {
    name: 'common/space/replaceTab',
    index: '-5',
    handler(text) {
        return text.replace(/\t/g, '    ');
    }
};
