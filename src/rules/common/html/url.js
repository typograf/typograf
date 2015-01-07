Typograf.rule({
    title: 'Расстановка ссылок',
    name: 'common/html/url',
    sortIndex: 2000,
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/\\n+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, function($0, $1, $2) {
            var url = $2,
                fullUrl = $1 + '://' + $2,
                firstPart = '<a href="' + fullUrl + '">';

            if($1 === 'http') {
                url = url
                    .replace(/^www\./, '')
                    .replace(/^([^\/]+)\/$/, '$1');

                return firstPart + url + '</a>';
            }

            return firstPart + fullUrl + '</a>';
        });
    }
});
