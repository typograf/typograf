Typograf.rule({
    title: 'Расстановка <p> и <br/>',
    name: 'html/pbr',
    sortIndex: 700,
    func: function(text) {
        if(text.search(/\n/) === -1) {
            text = '<p>' + text + '</p>';
        } else {
            text = '<p>' + text.replace(/\n\n/g, '</p>\n<p>') + '<\/p>';
            text = text.replace(/([^>])\n/g, '$1<br/>\n');
        }

        return text;
    },
    enabled: false
});
