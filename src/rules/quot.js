Typograf.rule({
    title: 'Расстановка кавычек',
    name: 'quot',
    sortIndex: 700,
    func: function(text) {
        var letter = '[\\w\\dа-яёА-ЯЁ]',
            lquot = this.setting('lquot'),
            rquot = this.setting('rquot'),
            lquot2 = this.setting('lquot2'),
            rquot2 = this.setting('rquot2'),
            tag = '(?:^|<\\w.*?>)*',
            phraseL = '(?:…|' + letter + '|\\n)',
            phraseR = '(?:' + [letter, '[)!?.:;#*]'].join('|') + ')*',
            quotesL = '(«|»|„|“|”|‘|’|&quot;|")',
            quotesR = '(»|“|&quot;|")',
            reL = new RegExp('(' + tag + ')?' + quotesL + '(' + tag + phraseL + tag + ')', 'g'),
            reR = new RegExp('(' + tag + phraseR + tag + ')' + quotesR + '(' + phraseR + ')', 'g'),
            reL2 = new RegExp('(' + lquot + ')(.*?)' + lquot + '(.*?)(' + rquot + ')', 'g'),
            reR2 = new RegExp('(' + lquot + ')(.*?)' + rquot + '(.*?)(' + rquot + ')', 'g'),
            reDoubleL = new RegExp(lquot + lquot, 'g'),
            reDoubleR = new RegExp(rquot + rquot, 'g');
            
        text = text
            .replace(reL, '$1' + lquot + '$3')
            .replace(reR, '$1' + rquot + '$3');
            
        if(lquot === lquot2 && rquot === rquot2) {
            text = text
                .replace(reDoubleL, '$1$2' + lquot + '$3$4')
                .replace(reDoubleR, '$1$2' + rquot + '$3$4');
        } else {
            text = text
                .replace(reL2, '$1$2' + lquot2 + '$3$4')
                .replace(reR2, '$1$2' + rquot2 + '$3$4');
        }

        return text;
    }
});

Typograf.defaultSetting({
    lquot: '«',
    rquot: '»',
    lquot2: '„',
    rquot2: '“'
});
