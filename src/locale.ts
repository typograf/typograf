const locales: string[] = [];

export function addLocale(locale: string) {
    const code = (locale || '').split('/')[0];
    if (code && code !== 'common' && !hasLocale(code)) {
        locales.push(code);
        locales.sort();
    }
}

export function getLocales(): string[] {
    return locales;
}

export function hasLocale(locale: string) {
    return locale === 'common' || locales.indexOf(locale) !== -1;
}

export function prepareLocale(locale1?: string | string[], locale2?: string | string[]): string[] {
    const locale = locale1 || locale2;

    if (!locale) {
        return [];
    }

    return Array.isArray(locale) ? locale : [ locale ];
}


export function checkLocales(locales: string[]) {
    if (!locales.length) {
        throw Error('Not defined the property "locale".');
    }

    locales.forEach(locale => {
        if (!hasLocale(locale)) {
            throw Error(`"${locale}" is not supported locale.`);
        }
    });
}
