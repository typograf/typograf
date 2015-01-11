Typograf.rule({
    name: 'ru/dash/koe',
    sortIndex: 38,
    func: function(text) {
        var re = new RegExp(Typograf._ruDashBefore +
            '(К|к)ое\\s([а-яё]{3,})' +
            Typograf._ruDashAfter, 'g');

        text = text.replace(re, '$1$2ое-$3$4');
        
        var re2 = new RegExp(Typograf._ruDashBefore +
            '(К|к)ой\\s([а-яё]{3,})' +
            Typograf._ruDashAfter, 'g');

        return text.replace(re2, '$1$2ой-$3$4');
    }
});
