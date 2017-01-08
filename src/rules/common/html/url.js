Typograf.addRule({
    name: 'common/html/url',
    queue: 'end',
    handler: function(text) {
        return this._isHTML ? text : text.replace(Typograf._reUrl, function($0, protocol, path) {
            path = path
                .replace(/([^\/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
                .replace(/^([^\/]+)\/$/, '$1'); // Remove ending /

            if (protocol === 'http') {
                path = path.replace(/^([^\/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
            } else if (protocol === 'https') {
                path = path.replace(/^([^\/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
            }

            var url = path,
                fullUrl = protocol + '://' + path,
                firstPart = '<a href="' + fullUrl + '">';

            if (protocol === 'http' || protocol === 'https') {
                url = url.replace(/^www\./, '');

                return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
            }

            return firstPart + fullUrl + '</a>';
        });
    },
    disabled: true
});
