Typograf.rule({
    title: 'Расстановка ссылок',
    name: 'html:url',
    sortIndex: 200,
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/\\n+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, function($0, $1, $2) {
            var first = '<a href="' + $1 + '://' + $2 + '">',
                url = $2;

            if($1 === 'http') {
                url = url.replace(/^www\./, '');

                if(url.search(/\/$/) !== -1 && url.split('/').length === 2) {
                    url = url.replace(/\/$/, '');
                }

                return first + url +'</a>';
            }

            return first + $1 + '://' + $2 +'</a>';
        });
    }
});
