import Typograf from '../../../typograf';

export default {
    name: 'common/symbols/copy',
    handler(text) {
        return Typograf._replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    }
};
