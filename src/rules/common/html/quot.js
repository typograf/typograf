export default {
    name: 'common/html/quot',
    queue: 'hide-safe-tags',
    handler(text) {
        return text.replace(/&quot;/g, '"');
    }
};
