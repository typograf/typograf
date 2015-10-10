Typograf.rule({
    name: 'ru/nbsp/beforeParticle',
    index: '+5',
    handler: function(text) {
        var particles = '(ли|ль|же|ж|бы|б)',
            re1 = new RegExp('([А-ЯЁа-яё]) ' + particles + '(?=[?!,.:;"‘“»])', 'g'),
            re2 = new RegExp('([А-ЯЁа-яё])[ \u00A0]' + particles + '[ \u00A0]', 'g');

        return text
            .replace(re1, '$1\u00A0$2')
            .replace(re2, '$1\u00A0$2 ');
    }
});
