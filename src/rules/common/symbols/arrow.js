import { replace } from '../../../helpers/string';

export default {
    name: 'common/symbols/arrow',
    handler(text) {
        return replace(text, [
            [/(^|[^-])->(?!>)/g, '$1→'],
            [/(^|[^<])<-(?!-)/g, '$1←']
        ]);
    }
};
