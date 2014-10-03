Typograf.rule('dash_month', 610, function(text) {
    var part = '(январь|февраль|март|апрель|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь)',
        re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

    return text.replace(re, '$1' + this.setting('dashInterval') + '$3');
});
