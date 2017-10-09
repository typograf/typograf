Typograf.addRule({
    name: 'common/html/p',
    index: '+5',
    queue: 'end',
    handler(text) {
        const blockRe = new RegExp('<(' + Typograf.blockElements.join('|') + ')[>\\s]');
        const separator = '\n\n';
        const buffer = text.split(separator);

        buffer.forEach(function(text, i, data) {
            if (!text.trim()) { return; }

            if (!blockRe.test(text)) {
                data[i] = text.replace(/^(\s*)/, '$1<p>').replace(/(\s*)$/, '</p>$1');
            }
        });

        return buffer.join(separator);
    },
    disabled: true,
    htmlAttrs: false
});
