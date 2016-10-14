(function() {

var classNames = [
        'typograf-oa-lquote',
        'typograf-oa-n-lquote',
        'typograf-oa-sp-lquote'
    ],
    name = 'ru/optalign/quote';

Typograf.rule({
    name: name,
    handler: function(text) {
        var name = 'ru/punctuation/quote',
            lquotes = '(["' +
                this.setting(name, 'lquote') +
                this.setting(name, 'lquote2') +
                this.setting(name, 'lquote3') +
                '])',
            re = new RegExp('([\\d' + this.data('l') + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|' + Typograf._privateLabel + ')' + lquotes, 'gm');

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquote">$2</span>');
    },
    disabled: true
}).innerRule({
    name: name,
    queue: 'start',
    handler: function(text) {
        return Typograf._removeOptAlignTags(text, classNames);
    }
}).innerRule({
    name: name,
    queue: 'end',
    handler: function(text) {
        return Typograf._removeOptAlignTagsFromTitle(text, classNames);
    }
});

})();
