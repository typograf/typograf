Typograf.rule({
    name: 'ru/punctuation/quot',
    index: 700,
    handler: function(text, settings) {
        var lquot = settings.lquot,
            rquot = settings.rquot;

        text = Typograf._quot.call(this, text, settings);
        if(lquot === settings.lquot2 && rquot === settings.rquot2) {
            return text
                // ««Энергия» Синергия» -> «Энергия» Синергия»
                .replace(new RegExp(lquot + lquot, 'g'), lquot)
                // «Энергия «Синергия»» -> «Энергия «Синергия»
                .replace(new RegExp(rquot + rquot, 'g'), rquot);
        }
        
        return text;
    },
    settings: {
        lquot: '«',
        rquot: '»',
        lquot2: '„',
        rquot2: '“',
        lquot3: '‚',
        rquot3: '‘'
    }
});
