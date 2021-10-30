import { privateLabel } from '../../../consts';

const reColon = new RegExp('(\\D):([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

export default {
    name: 'common/space/afterColon',
    handler(text) {
        return text.replace(reColon, '$1: $2');
    }
};
