export default {
    name: 'common/space/bracket',
    handler(text) {
        return text
            .replace(/(\() +/g, '(')
            .replace(/ +\)/g, ')');
    }
};
