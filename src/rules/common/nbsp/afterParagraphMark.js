Typograf.addRule({
    name: 'common/nbsp/afterParagraphMark',
    handler(text) {
        return text.replace(/¶ ?(?=\d)/g, '¶\u00A0');
    }
});
