Typograf.rule({
    name: 'common/html/pbr',
    index: 90,
    queue: 'end',
    handler: function(text) {
        if(text.search(/<(p|br)[\s\/>]/) === -1) {
            if(text.search(/\n/) === -1) {
                text = '<p>' + text + '</p>';
            } else {
                text = '<p>' + text.replace(/\n\n/g, '</p>\n<p>') + '<\/p>';
                text = text.replace(/([^>])\n/g, '$1<br/>\n');
            }
        }

        return text;
    },
    disabled: true
});
