Typograf.rule('url', 200, function(text) {
    var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
        pureUrl = '([a-zA-Z0-9\/\\n+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
        re = new RegExp(prefix + pureUrl, 'g');

    return text.replace(re, '<a href="$1://$2">$1://$2</a>');
});
