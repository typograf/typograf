Typograf.addRule({
    name: 'ru/nbsp/mln',
    handler: function(text) {
        return text.replace(/(\d) ?(тыс|млн|млрд|трлн)(\.|\s|$)/gi, '$1\u00a0$2$3');
    }
});
