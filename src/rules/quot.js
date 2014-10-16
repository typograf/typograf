Typograf.rule({
    title: 'Расстановка кавычек',
    name: 'quot',
    sortIndex: 700,
    func: function(text) {
        return text; // TODO
    }
});

Typograf.defaultSetting('quot11', '«');
Typograf.defaultSetting('quot12', '»');
Typograf.defaultSetting('quot21', '„');
Typograf.defaultSetting('quot22', '“');
