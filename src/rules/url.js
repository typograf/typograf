Typograf.rule({
    title: 'Расстановка ссылок', 
    name: 'url', 
    sortIndex: 200, 
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/\\n+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, '<a href="$1://$2">$1://$2</a>');
    }
});
