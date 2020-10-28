import { Rule } from '../../../types';
import { regExpUrl } from '../../../helpers/regExp';

const rule: Rule = {
    name: 'common/html/url',
    queue: 'end',
    handler(text, settings, context) {
        return context.isHTML ? text : text.replace(regExpUrl, ($0, protocol: string, path: string) => {
            path = path
                .replace(/([^/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
                .replace(/^([^/]+)\/$/, '$1'); // Remove ending /

            if (protocol === 'http') {
                path = path.replace(/^([^/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
            } else if (protocol === 'https') {
                path = path.replace(/^([^/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
            }

            let url = path;
            const fullUrl = protocol + '://' + path;
            const firstPart = '<a href="' + fullUrl + '">';

            if (protocol === 'http' || protocol === 'https') {
                url = url.replace(/^www\./, '');

                return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
            }

            return firstPart + fullUrl + '</a>';
        });
    },
    disabled: true,
    htmlAttrs: false
};

export default rule;
