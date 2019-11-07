export default {
    name: 'common/space/beforeBracket',
    handler(text, settings, context) {
        const re = new RegExp('([' + context.getData('char') + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
};
