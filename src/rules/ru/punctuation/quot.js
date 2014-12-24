Typograf.rule({
    title: 'Расстановка кавычек',
    name: 'ru/punctuation/quot',
    sortIndex: 700,
    func: function(text, settings) {
        var letter = '[\\w\\dа-яёА-ЯЁ]',
            tag = '(?:^|<\\w.*?>)*',
            lquot = settings.lquot,
            rquot = settings.rquot,
            lquot2 = settings.lquot2,
            rquot2 = settings.rquot2,
            phraseL = '(?:…|' + letter + '|\\n)',
            phraseR = '(?:' + [letter, '[)!?.:;#*,]'].join('|') + ')*',
            quotesL = '(«|„|“|")',
            quotesR = '(»|”|“|")',
            reL = new RegExp('(' + tag + ')?' + quotesL + '(' + tag + phraseL + tag + ')', 'g'),
            reR = new RegExp('(' + tag + phraseR + tag + ')' + quotesR + '(' + phraseR + ')', 'g'),
            re2, reL2, reR2;

        text = text
            .replace(reL, '$1' + lquot + '$3') // Открывающая кавычка
            .replace(reR, '$1' + rquot + '$3') // Закрывающая кавычка
            .replace(new RegExp('(^|\\w|\\s)' + rquot + lquot, 'g'),
                '$1' + lquot + lquot); // фикс для случая »« в начале текста

        if(lquot === lquot2 && rquot === rquot2) {
            text = text
                .replace(new RegExp(lquot + lquot, 'g'), lquot) // ««Энергия» Синергия» -> «Энергия» Синергия»
                .replace(new RegExp(rquot + rquot, 'g'), rquot); // «Энергия «Синергия»» -> «Энергия «Синергия»
        } else {
            re2 = new RegExp('(' + lquot + ')([^' + rquot + ']*?)' + lquot +
                '(.*?)' + rquot + '([^' + lquot + ']*?)(' + rquot + ')', 'g');
            reL2 = new RegExp('(' + lquot2 + ')(.*?)' + lquot + '(.*?)(' + rquot2 + ')', 'g');
            reR2 = new RegExp('(' + lquot2 + ')(.*?)' + rquot + '(.*?)(' + rquot2 + ')', 'g');

            text = text
                .replace(re2, '$1$2' + lquot2 + '$3' + rquot2 + '$4$5') // Предварительная расстановка вложенных кавычек
                .replace(reL2, '$1$2' + lquot2 + '$3$4') // Вложенная открывающая кавычка
                .replace(reR2, '$1$2' + rquot2 + '$3$4'); // Вложенная закрывающая кавычка
        }

        return text;
    },
    settings: {
        lquot: '«',
        rquot: '»',
        lquot2: '„',
        rquot2: '“'
    }
});
