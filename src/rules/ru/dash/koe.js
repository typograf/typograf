Typograf.rule({
    name: 'ru/dash/koe',
    sortIndex: 38,
    func: function(text) {
        var ruDash = this.data('ru/dash'),
            re = new RegExp(ruDash.before + '(К|к)ое\\s([а-яё]{3,})' + ruDash.after, 'g'),
            re2 = new RegExp(ruDash.before + '(К|к)ой\\s([а-яё]{3,})' + ruDash.after, 'g');

        return text
            .replace(re, '$1$2ое-$3$4')
            .replace(re2, '$1$2ой-$3$4');
    }
});
