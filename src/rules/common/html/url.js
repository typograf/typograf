Typograf.rule({
    name: 'common/html/url',
    sortIndex: 2010,
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, function($0, protocol, path) {
            path = path
                .replace(/([^\/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
                .replace(/^([^\/]+)\/$/, '$1'); // Remove ending /
                
            if(protocol === 'http') {
                path = path.replace(/^([^\/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
            } else if(protocol === 'https') {
                path = path.replace(/^([^\/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
            }

            var url = path,
                fullUrl = protocol + '://' + path,
                firstPart = '<a href="' + fullUrl + '">';

            if(protocol === 'http' || protocol === 'https') {
                url = url.replace(/^www\./, '');

                return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
            }

            return firstPart + fullUrl + '</a>';
        });
    },
    disabled: true
});
