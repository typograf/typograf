export default {
    name: 'common/nbsp/dpi',
    handler(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    }
};
