Typograf.rule({
    title: 'Расстановка ссылок для эл. почты',
    name: 'common/html/mail',
    sortIndex: 2000,
    func: function(text) {
        return text.replace(
            /(^|[\s;(])([\w\-.]{2,})@([\w\-.]{2,})\.([a-z]{2,6})([)\s.,!?]|$)/gi,
            '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5'
        );
    }
});
