export default {
    name: 'common/space/delBetweenExclamationMarks',
    handler(text) {
        return text.replace(/([!?]) (?=[!?])/g, '$1');
    }
};
