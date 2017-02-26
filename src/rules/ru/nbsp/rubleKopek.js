Typograf.addRule({
    name: 'ru/nbsp/rubleKopek',
    handler: function(text) {
        return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
    }
});
