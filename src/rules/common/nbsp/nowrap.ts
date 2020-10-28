import { Rule } from '../../../types';

function replaceNbsp($0: string, $1: string, $2: string, $3: string) {
    return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
}

const rule: Rule = {
    name: 'common/nbsp/nowrap',
    queue: 'end',
    handler(text) {
        return text
            .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
            .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
    }
};

export default rule;
