Typograf.rule({
    name: 'ru/nbsp/beforeParticle',
    index: 600,
    handler: function(text) {
        var particles = '(ли|ль|же|ж|бы|б)',
            re1 = new RegExp(' ' + particles + '(?=[?!,.:;"‘“»])', 'g'),
            re2 = new RegExp('[ \u00A0]' + particles + '[ \u00A0]', 'g');

        return text
            .replace(re1, '\u00A0$1')
            .replace(re2, '\u00A0$1 ');
    }
});
