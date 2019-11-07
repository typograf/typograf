function replaceNbsp($0, $1, $2, $3) {
    return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
}

export default {
    name: 'common/nbsp/nowrap',
    queue: 'end',
    handler(text) {
        return text
            .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
            .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
    }
};
