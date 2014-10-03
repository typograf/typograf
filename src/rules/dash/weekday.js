Typograf.rule('dash_weekday', 600, function(text) {
    var dash = this.setting('dashInterval'),
        part = '(понедельник|вторник|среда|четверг|пятница|суббота|воскресенье)',
        re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

    return text.replace(re, '$1—$3')
        .replace(/(^|\n|>) ?(-|—) /g, '$1— ')
        .replace(/(^|[^\d\-])(\d{1,4}) ?(-|—) ?(\d{1,4})([^\d\-\=]|$)/g, '$1$2' + dash + '$4$5');
});
