(function() {

function replaceNbsp($0, $1, $2, $3) {
    return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
}

Typograf.rule({
    title: 'Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr',
    name: 'common/nbsp/nowrap',
    sortIndex: 1400,
    func: function(text) {
        return text
            .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
            .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
    }
});

})();
