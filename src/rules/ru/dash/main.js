Typograf.rule({
    name: 'ru/dash/main',
    index: 620,
    handler: function(text) {
        var name = 'ru/dash/main',
            dash = this.setting(name, 'dash'),
            dashes = '(' + Typograf.data('common/dash') + ')',
            ruLetter = Typograf.data('ru/letter'),
            reMain = new RegExp('( |\u00A0)' + dashes + '( |\\n)', 'g'),
            reDirect1 = new RegExp('(["»‘“,.…?!])[ |\u00A0]?' + dashes + '[ |\u00A0]', 'g'),
            reDirect2 = new RegExp('(^|' + Typograf._privateLabel + ')' + dashes + '( |\u00A0)', 'gm'),
            reInterval = new RegExp('(X|I|V)[ |\u00A0]?' + dashes + '[ |\u00A0]?(X|I|V)', 'g'),
            reSurname = new RegExp('([' + Typograf.data('ru/letterUpper') + '][' +
                ruLetter + ']+)\\s-([' + ruLetter + ']{1,3})(?![^' + ruLetter + ']|$)', 'g');

        return text
            .replace(reMain, '\u00A0' + dash + '$3')
            .replace(reDirect1, '$1 ' + dash + '\u00A0') // Прямая речь
            .replace(reDirect2, '$1' + dash + '\u00A0')
            .replace(reInterval, '$1' + this.setting(name, 'dashInterval') + '$3') // Интервалы
            .replace(reSurname, '$1\u00A0' + dash + '$2'); // Сокращения с помощью тире, редкий случай
    },
    settings: {
        dash: '\u2014', // &mdash;
        dashInterval: '\u2014' // &mdash;
    }
});
