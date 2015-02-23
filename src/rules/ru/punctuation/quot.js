Typograf.rule({
    name: 'ru/punctuation/quot',
    sortIndex: 700,
    func: function(text, settings) {
        var letters = '\\d' + this.letters() + '\u0301',
            lquot = settings.lquot,
            rquot = settings.rquot,
            lquot2 = settings.lquot2,
            rquot2 = settings.rquot2,
            phrase = '[' + letters + ')!?.:;#*,' + ']*?',
            reL = new RegExp('[«„“"]' + '([…' + letters + '])', 'gi'),
            reR = new RegExp('(' + phrase + ')' + '[»”“"]' + '(' + phrase + ')', 'gi'),
            reL1 = new RegExp(rquot2 + '([^' + lquot2 + rquot2 + ']*?)' + rquot2, 'g'),
            reR1 = new RegExp(lquot2 + '([^' + lquot2 + rquot2 + ']*?)' + lquot2, 'g'),
            reL2 = new RegExp(lquot2, 'g'),
            reR2 = new RegExp(rquot2, 'g');

        text = text
            .replace(reL, lquot2 + '$1') // Открывающая кавычка
            .replace(reR, '$1' + rquot2 + '$2') // Закрывающая кавычка
            .replace(new RegExp('(^|\\w|\\s)' + rquot2 + lquot2, 'g'),
                '$1' + lquot2 + lquot2); // фикс для случая »« в начале текста

        if(lquot === lquot2 && rquot === rquot2) {
            text = text
                .replace(reL2, lquot)
                .replace(reR2, rquot)
                // ««Энергия» Синергия» -> «Энергия» Синергия»
                .replace(new RegExp(lquot + lquot, 'g'), lquot)
                 // «Энергия «Синергия»» -> «Энергия «Синергия»
                .replace(new RegExp(rquot + rquot, 'g'), rquot);
        } else {
            text = text
                .replace(reL1, rquot2 + '$1' + rquot)
                .replace(reR1, lquot + '$1' + lquot2);
                
            if(text.search(new RegExp(lquot + '|' + rquot)) === -1) {
                text = text
                    .replace(reL2, lquot)
                    .replace(reR2, rquot);
            }
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
