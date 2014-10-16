Typograf.rule({
    title: 'Дефис между месяцами',
    name: 'dash:month',
    sortIndex: 610,
    func: function(text) {
        var part = '(январь|февраль|март|апрель|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь)',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('dashInterval') + '$3');
    }
});
