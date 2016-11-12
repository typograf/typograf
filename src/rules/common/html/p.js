Typograf.rule({
    name: 'common/html/p',
    queue: 'end',
    handler: function(text) {
        if (text.search(/<p[\s>]/) === -1) {
            if (text.search(/\n/) === -1) {
                text = '<p>' + text + '</p>';
            } else {
                text = '<p>' + text.replace(/\n\n/g, '</p>\n<p>') + '<\/p>';
            }
        }

        return text;
    },
    disabled: true
});
