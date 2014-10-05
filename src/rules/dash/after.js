// Тире
Typograf.rule('dash', 620, function(text) {
    var re = new RegExp('( |\u00A0)(-|—)( |\\n)', 'g');
    return text.replace(re, '\u00A0—$3').replace(/(X|I|V) ?- ?(X|I|V)/g, '$1—$2');
});

Typograf.defaultSetting('dashInterval', '\u2014');
Typograf.defaultSetting('dash', '\u2014');
