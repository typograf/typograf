import { getData } from '../../../data';

export default {
    name: 'ru/dash/izza',
    handler(text) {
        const re = new RegExp(getData('ru/dashBefore') + '(И|и)з за' + getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-за');
    }
};
