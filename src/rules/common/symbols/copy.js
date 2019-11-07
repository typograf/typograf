import { replace } from '../../../helpers/string';

export default {
    name: 'common/symbols/copy',
    handler(text) {
        return replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    }
};
